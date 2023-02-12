import * as GithubController from '../controller'
import * as GithubTypes from '../types'
beforeAll(async () => {
  // do something before anything else runs
  console.log('Jest starting!')
})
// close the server after each test
afterAll(() => {
  console.log('server closed!')
})

describe('Parse Link Header', () => {
  test('empty headers', async () => {
    const headers = <GithubTypes.Headers>{}

    const response = GithubController.parseHeadersForPageCount(headers)
    expect(response).toEqual(1)
  })

  test('expect 2 pages', async () => {
    const headers = <GithubTypes.Headers>{
      link: '<https://api.github.com/repositories/599358392/pulls/1/commits?page=2&per_page=1>; rel="next", <https://api.github.com/repositories/599358392/pulls/1/commits?page=2&per_page=1>; rel="last"',
    }

    const response = GithubController.parseHeadersForPageCount(headers)
    expect(response).toEqual(2)
  })

  test('expect 100 pages', async () => {
    const headers = <GithubTypes.Headers>{
      link: '<https://api.github.com/repositories/599358392/pulls/1/commits?page=2&per_page=1>; rel="next", <https://api.github.com/repositories/599358392/pulls/1/commits?page=100&per_page=1>; rel="last"',
    }

    const response = GithubController.parseHeadersForPageCount(headers)
    expect(response).toEqual(100)
  })
})

describe('Validate payload', () => {
  test('null payload', async () => {
    const response = GithubController.isGetAllRequestDto(null)
    expect(response).toBeFalsy()
  })

  test('undefined payload', async () => {
    const response = GithubController.isGetAllRequestDto(undefined)
    expect(response).toBeFalsy()
  })

  test('empty string', async () => {
    const response = GithubController.isGetAllRequestDto('')
    expect(response).toBeFalsy()
  })

  test('empty object', async () => {
    const response = GithubController.isGetAllRequestDto({})

    expect(response).toBeFalsy()
  })

  test('missing owner parameter', async () => {
    const response = GithubController.isGetAllRequestDto({
      repo: 'meridian',
    })

    expect(response).toBeFalsy()
  })

  test('valid payload', async () => {
    const response = GithubController.isGetAllRequestDto({
      owner: 'stevenmays',
      repo: 'meridian',
    })
    expect(response).toBeTruthy()
  })
})
