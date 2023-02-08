import axios from 'axios'
import * as GithubTypes from '../types'
import { getHeaders, githubBaseUri } from './base'

export interface ListPullRequestCommitsInput {
  /** The name of the repository. The name is not case sensitive. */
  repo: string
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string
  /** The number that identifies the pull request. */
  pull_request_number: number
  /** Page number of the results to fetch. */
  page?: number
  /** The number of results per page (max 100). */
  per_page?: number
}

/**
 * Retrieves the commits associated with a pull request. Lists a maximum of 250 commits for a pull request.
 * If we require more then 250 commits for the pull request we need to use the "List Commits" endpoint.
 *
 * @link https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#list-commits-on-a-pull-request
 */
export function listPullRequestCommits(input: ListPullRequestCommitsInput) {
  const uri = `${githubBaseUri()}/repos/${input.owner}/${input.repo}/pulls/${
    input.pull_request_number
  }/commits`

  return axios.get<GithubTypes.PullRequestCommit[]>(uri, {
    ...getHeaders(),
    params: {
      page: input.page,
      per_page: input.per_page,
    },
  })
}
