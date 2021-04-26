
import { axios } from '../common'
import { clientConstructor } from '../../src/api-client/client'
import { API_URL } from '../../src/constants'
import { Customers } from '../../src/api-client/resources'

beforeEach(() => {
  axios.reset()
  axios.onAny().reply(200)
})

const constants = {
  baseUrl: API_URL,
  apiKey: 'apiKey',
  apiSecret: 'apiSecret',
  token: 'token',
  writeKey: 'writeKey',
}

const http = clientConstructor({
  apiKey: constants.apiKey,
  apiSecret: constants.apiSecret,
  writeKey: constants.writeKey
})

const customerRequest = new Customers(http)

test('customer create sends correct request', async () => {
  const data = {
    email: 'unique@mail.com'
  }

  await customerRequest.create({
    token: constants.token,
    data,
  })

  expect(axios.history.post[0].url).toBe(`${constants.baseUrl}/customers/`)
  expect(axios.history.post[0].data).toBe(JSON.stringify(data))

})