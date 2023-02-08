import * as Axios from 'axios'

export function githubBaseUri() {
  return 'https://api.github.com'
}

export function getHeaders(version = '2022-11-28') {
  const headers = <Axios.AxiosRequestHeaders>{}
  headers['Accept'] = 'application/vnd.github+json'
  headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
  headers['X-GitHub-Api-Version'] = version

  return { headers }
}
