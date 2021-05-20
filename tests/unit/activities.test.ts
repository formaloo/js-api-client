
import { axios } from '../common'
import { clientConstructor } from '../../src/api-client/client'
import { API_URL, API_VERSION } from '../../src/constants'
import { Activities } from '../../src/api-client/resources'

beforeEach(() => {
  axios.reset()
  axios.onAny().reply(200)
})

const constants = {
  baseUrl: API_URL + '/' + API_VERSION,
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

const activityRequest = new Activities(http)

test('activity create sends correct request', async () => {
  const data = {
    action: "actionType",
    customer: {
      code: "customerCode"
    },
    activity_data: {
      "ticket_code": "123456"
    },
    tags: [
      {
        slug: 'tagSlug'
      },
      {
        title: 'tagTitle'
      }
    ]
  }

  await activityRequest.create({
    useWriteKey: true,
    data,
  })

  expect(axios.history.post[0].url).toBe(`${constants.baseUrl}/activities/`)
  expect(axios.history.post[0].data).toBe(JSON.stringify(data))
  expect(axios.history.post[0].headers['x-api-key']).toBe(constants.writeKey)
})
