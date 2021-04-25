import { axios } from '../common'
import { clientConstructor } from '../../src/api-client/client'

beforeEach(() => {
  axios.reset()
  axios.onAny().reply(200)
})

test('client constructor has a request function property', () => {
  const client = clientConstructor({
    apiKey: 'key',
    apiSecret: 'secret',
    writeKey: 'writeKey'
  })
  expect(client.request).toBeDefined()
})
