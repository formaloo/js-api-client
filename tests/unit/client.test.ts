import { axios } from '../common'
import { clientConstructor, buildUrlWithParams } from '../../src/api-client/client'
import { API_URL, API_VERSION } from '../../src/constants'

beforeEach(() => {
  axios.reset()
  axios.onAny().reply(200)
})

const constants = {
  baseUrl: API_URL + '/' + API_VERSION,
  apiKey: 'apiKey',
  writeKey: 'writeKey',
  apiSecret: 'secret',
  token: 'token',
}

const client = clientConstructor({
  apiKey: constants.apiKey,
  apiSecret: constants.apiSecret,
  writeKey: constants.writeKey
})

const writeOnlyClient = clientConstructor({
  writeKey: constants.writeKey
})

describe('writeOnly client', () => {
  test('request pass correct headers', async () => {
    await writeOnlyClient.request({
      url: '/customers',
      method: 'get',
      headers: {
        Accepts: 'application/json'
      },
    })
    expect(axios.history.get[0].url).toBe(`${constants.baseUrl}/customers/`)
    expect(axios.history.get[0].headers).toEqual({
      Accept: 'application/json, text/plain, */*',
      Accepts: 'application/json',
      'x-api-key': constants.writeKey,
    })
  })
})

describe('authorized client', () => {
  test('request pass correct headers', async () => {
    await client.request({
      url: '/customers',
      method: 'get',
      headers: {
        Accepts: 'application/json'
      },
      token: constants.token,
    })
    expect(axios.history.get[0].url).toBe(`${constants.baseUrl}/customers/`)
    expect(axios.history.get[0].headers).toEqual({
      Accept: 'application/json, text/plain, */*',
      Accepts: 'application/json',
      'x-api-key': constants.apiKey,
      Authorization: `JWT ${constants.token}`,
    })
  })
})

describe('client url and params', () => {
  test('the url remains the same if no parameter passed', () => {
    const url = constants.baseUrl + '/'
    expect(buildUrlWithParams(url)).toBe(url)
  })

  test('the url has a query string if parameters are passed', () => {
    const url = constants.baseUrl
    const params = {
      a: '1',
      b: '2'
    }
    expect(buildUrlWithParams(url, params)).toBe(`${constants.baseUrl}/?a=1&b=2`)
  })

  test('parameters should be encoded', () => {
    const url = constants.baseUrl
    const params = {
      a: '@1',
      b: '#2'
    }
    expect(buildUrlWithParams(url, params)).toBe(`${url}/?a=%401&b=%232`)
  })

  test('undefined values for parameter will be skipped', () => {
    const url = constants.baseUrl
    const params = {
      a: '@1',
      b: undefined
    }
    expect(buildUrlWithParams(url, params)).toBe(`${url}/?a=%401`)
  })

  test('falsy values should be passed', () => {
    const url = constants.baseUrl
    const params = {
      a: '0',
      b: 0,
      c: null
    }
    expect(buildUrlWithParams(url, params)).toBe(`${url}/?a=0&b=0`)
  })
})
