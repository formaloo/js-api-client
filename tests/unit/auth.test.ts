
import { axios } from '../common'
import { clientConstructor } from '../../src/api-client/client'
import { API_URL, API_VERSION } from '../../src/constants'
import { Auth } from '../../src/api-client/auth'
import { encodeAsQuerystring } from '../../src/utils'

beforeEach(() => {
  axios.reset()
  axios.onAny().reply(200)
})

const constants = {
  baseUrl: API_URL + '/' + API_VERSION,
  apiKey: 'apiKey',
  writeKey: 'writeKey',
  apiSecret: 'apiSecret',
  token: 'token',
}

const http = clientConstructor({
  apiKey: constants.apiKey,
  apiSecret: constants.apiSecret,
  writeKey: constants.writeKey
})

const authRequest = new Auth(http)

test('oauth request passes correct headers', async () => {
  const data = encodeAsQuerystring({"grant_type":"client_credentials"})

  await authRequest.getAccessToken()

  expect(axios.history.post[0].url).toBe(`${constants.baseUrl}/oauth2/authorization-token/`)
  expect(axios.history.post[0].data).toBe(data)
  expect(axios.history.post[0].headers).toEqual({
    Accept: 'application/json, text/plain, */*',
    "Content-Type": "application/x-www-form-urlencoded",
    'x-api-key': constants.apiKey,
    Authorization: `Basic ${constants.apiSecret}`,
  })
})