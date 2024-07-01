[![Qodana](https://github.com/natereprogle/hawk-js/actions/workflows/qodana_code_quality.yml/badge.svg?branch=main)](https://github.com/natereprogle/hawk-js/actions/workflows/qodana_code_quality.yml)
[![CI](https://github.com/natereprogle/hawk-js/actions/workflows/main.yml/badge.svg)](https://github.com/natereprogle/hawk-js/actions/workflows/main.yml)

# hawk-js 🦅

hawk-js is an <u>**unofficial**</u> JavaScript library for interacting with [UtilityHawk](https://utilityhawk.com/)
and [AquaHawk](https://aquahawk.com/).

## What is Utility/AquaHawk?

UtilityHawk and AquaHawk are websites that cities and utility companies can use to provide near-realtime (Or in some
cases, realtime) utility usage information to citizens. It's useful for budgeting purposes, activity tracking, trends,
and AquaHawk even allows for features like live leak detection.

UtilityHawk/AquaHawk does not have a public API, but by studying the API calls the browser makes and doing a little
reverse engineering of the bundled source code, I was able to reverse engineer at least most of their API.

## ...Why?

HomeAssistant made me do it. I don't have any way of monitoring my actual electric usage in my home (Will be changing
soon), and my meter uses AES-128 2.4 GHz encrypted communications, so I can't even attempt to intercept those for
monitoring purposes. I wanted live usage data in Home Assistant, however I found out my utility only updates
information every 24 hours. Still, this was a fun project that I bet others will find use for.

# Usage

1. Create an instance of HawkClient. The session token is stored on this client, so any other clients will also need
   authenticated individually (Useful if you had more than one account, for some reason)

```typescript
const hawkClient = HawkClient.create({
    username: 'my.username@gmail.com',
    password: 'mypassword123$',
    districtName: 'your_district_prob_your_city', // Whatever is in front of utilityhawk.us in the URL of the page you sign in on
    platform: 'utilityhawk' | 'aquahawk', // Take your pick here, it _does_ matter
})
```

2. Start making requests!

```typescript
import { toISO8601WithTimezone } from './AlertHelper'

const date = new Date()
const dateMinus5Days = new Date(date.setDate(date.getDate() - 5))

const data = await hawkClient.queryTimeseriesData('your_utility_account_number_on_your_bill', toISO8601WithTimezone(date), toISO8601WithTimezone(dateMinus5Days), '1 hour', true, true, {
    electricUse: true,
    electricUseReading: true,
    temperature: true,
    rainfall: true,
}) // The metrics parameter can be left out, it doesn't appear to affect anything anyway

console.log(JSON.stringify(data))
```

# Questions? Comments? Concerns?

Open an issue, that's what they're there for!

# Contributing

Information on this coming soon. The gist of it is:

1. Make your changes
2. Write/update unit tests
3. Lint and ensure tests pass
4. Create changeset, push, and create PR