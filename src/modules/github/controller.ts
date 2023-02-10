import HttpStatus from 'http-status'
import { Context } from 'koa'
import parseLinkHeader from 'parse-link-header'
import { BadRequestError } from '../../lib/error'
import * as GithubHttp from './http'
import * as GithubTypes from './types'

export interface GetAllDto {
  owner: string
  repo: string
}

export interface Response {
  /** id of the pull request */
  id: number
  /** pull request number */
  number: number
  /** pull request title */
  title: string
  /** pull request author */
  author: string
  /** number of commits for the pull request */
  commit_count: number
}

export async function getAll(ctx: Context) {
  const input = ctx.request.body

  if (!isGetAllRequestDto(input)) {
    throw new BadRequestError('Body missing required params')
  }

  const pullRequestResponse = await GithubHttp.listPullRequests({
    owner: input.owner,
    repo: input.repo,
  })

  // Build an array of promises to be me made in parallel.
  const promises = pullRequestResponse.data.map((pullRequest) =>
    GithubHttp.listPullRequestCommits({
      owner: input.owner,
      repo: input.repo,
      pull_request_number: pullRequest.number,
      // Set the page to 1, and the per_page to 1 so that we can determine the amount of pages from the
      // header in one API call, instead of paging through multiple pages.
      page: 1,
      per_page: 1,
    })
  )

  // Use promise.all to make the requests in parallel.
  const commitsResponses = await Promise.all(promises)
  const commitCounts = commitsResponses
    .map((commitsResponse) => <GithubTypes.Headers>commitsResponse.headers)
    .map(parseHeadersForPageCount)

  // Since the map method preserves order, and we've previously used map for array iteration, we can be confident the index
  // of the commitCounts array matches the index of the pullRequestResponse array.
  const pullRequests = pullRequestResponse.data.map<Response>((pullRequest, index) => ({
    id: pullRequest.id,
    number: pullRequest.number,
    title: pullRequest.title,
    author: pullRequest.user.login,
    commit_count: commitCounts[index],
  }))

  ctx.body = { data: pullRequests }
  ctx.status = HttpStatus.OK
}

function isGetAllRequestDto(value: any): value is GetAllDto {
  return (
    value !== null &&
    typeof value === 'object' &&
    value.owner &&
    typeof value.owner === 'string' &&
    value.repo &&
    typeof value.repo === 'string'
  )
}

/**
 * Parses the Github headers, and returns the final page. This is useful if you query an endpoint,
 * and set the page and per_page parameters to one. Then the last page parameter is the total count.
 */
function parseHeadersForPageCount(headers: GithubTypes.Headers) {
  if (!headers.link) {
    // if there is no link property in the headers, then there is only one page, and since we've set the per_page to 1
    // and the minimum commit amount for a pull request is 1, then this must be 1.
    return 1
  }

  const link = parseLinkHeader(headers.link)

  if (!link.last?.page) {
    return 1
  }

  return parseInt(link.last.page, 10)
}
