import axios from 'axios'
import * as GithubTypes from '../types'
import { getHeaders, githubBaseUri } from './base'

export interface ListPullRequestInput {
  /**
   * the repo name
   * @example "vacaro"
   */
  repo: string

  /**
   * the repo owner
   * @example "stevenmays"
   */
  owner: string
}

/**
 * Retrieves pull requests from the github api.
 *
 * @link https://docs.github.com/en/rest/pulls/pulls#list-pull-requests
 */
export function listPullRequests(input: ListPullRequestInput) {
  const uri = `${githubBaseUri()}/repos/${input.owner}/${input.repo}/pulls`
  return axios.get<GithubTypes.PullRequest[]>(uri, { ...getHeaders() })
}
