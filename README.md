# hawk-js 🦅

hawk-js is an <u>**unofficial**</u> JavaScript library for interacting with [UtilityHawk](https://utilityhawk.com/)
and [AquaHawk](https://aquahawk.com/).

[![Qodana](https://github.com/natereprogle/hawk-js/actions/workflows/qodana_code_quality.yml/badge.svg?branch=main)](https://github.com/natereprogle/hawk-js/actions/workflows/qodana_code_quality.yml)
[![CI](https://github.com/natereprogle/hawk-js/actions/workflows/main.yml/badge.svg)](https://github.com/natereprogle/hawk-js/actions/workflows/main.yml)

## What is Utility/AquaHawk?

UtilityHawk and AquaHawk are websites that cities and utility companies can use to provide near-realtime (Or in some
cases, realtime) utility usage information to citizens. It's useful for budgeting purposes, activity tracking, trends,
and AquaHawk even allows for features like live leak detection.

# Usage

Create an instance of HawkClient, providing your login credentials, district name, and whether you use utilityhawk or
aquahawk. Then, simply make requests against the client.

Most requests use a simplified configuration object that is automatically converted to the more complex version that the
UtilityHawk/AquaHawk APIs require.
This makes it easier on you to ask for what you need or want without having to figure out what some parameter is.

## Sample

```typescript
import { toISO8601WithTimezone } from './AlertHelper'

// Create the hawk-js client
const hawkClient = HawkClient.create({
    username: 'my.username@gmail.com',
    password: 'mypassword123$',
    districtName: 'your_district_prob_your_city', // Whatever is in front of utilityhawk.us or aquahawk.us in the URL of the page you sign in on
    platform: 'utilityhawk' | 'aquahawk', // Take your pick here, it _does_ matter
})

// Create some date objects for future reference
const date = new Date()
const dateMinus5Days = new Date(date.setDate(date.getDate() - 5))

// Ask for your utility data!
const data = await hawkClient.queryTimeseriesData('your_utility_account_number_on_your_bill', toISO8601WithTimezone(date), toISO8601WithTimezone(dateMinus5Days), '1 hour', true, true, {
    electricUse: true,
    electricUseReading: true,
    temperature: true,
    rainfall: true,
}) // The metrics parameter can be left out. When left out, hawk-js will send it automatically just in case. However, it doesn't appear to affect the response in any way regardless

console.log(JSON.stringify(data))
```

## Responses

All API responses are typed, ending in `Response`. An index.d.ts file has been included in the bundle, so
if you're using TypeScript you'll get the added bonus of type safety when developing.

Unfortunately, the way the developers of UtilityHawk and AquaHawk developed their API, many endpoints return 200 OK
for failures, and will instead include a `success: false` value in the body to indicate the failure (For example, the
register accounts endpoint). hawk-js will not automatically catch these, so it is your responsibility to check
for success or failure and act accordingly. Luckily a `message` value is also almost always included which
explains why the call failed, which should help you debug.

# Commands

<details>
<summary></summary>

</details>

# Questions? Comments? Concerns?

Open an issue, that's what they're there for!

# Contributing

Information on this coming soon. The gist of it is:

1. Make your changes
2. Write/update unit tests
3. Lint and ensure tests pass
4. Create changeset, push, and create PR