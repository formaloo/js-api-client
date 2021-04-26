# Formaloo JS API Client

![npm (scoped)](https://img.shields.io/npm/v/@formaloo/api-client)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Installation

`npm install --save @formaloo/api-client`

## Usage

1. import library
```
  // using ES Modules
  import { Formaloo } from '@formaloo/api-client'
  // using CommonJS syntax
  const { Formaloo } = require('@formaloo/api-client')
```

2. create instance with your credentials
```
  const formaloo = Formaloo.APIClient.create({
    apiKey,
    apiSecret,
    writeKey,
  })
```

3. use available methods on client based on your needs

  * Please note that either `useWriteKey` or `token` should be present on all method calls.
    You can also create formaloo instance with only `writeKey` to create a write-only client.

```
  const response = await formaloo.customers.create({
    email: 'customer@email.com',
    phone_number: '+123456789',
    useWriteKey: true, // for create/update operations you might want to use your write-only key instead of access token
    token, // your access token obtained using your `KEY` and `SECRET`
  })
```

**NOTES:**
1. DO NOT USE your secret on client side (apps running in browser)
2. You might want to use your write-only in browser or less secure environments
   which has limited access to create or update (patch) your data.

## Examples