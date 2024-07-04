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
<summary>Query Timeseries Data</summary>

Downloads timeseries data for your utilities on your account. This will automatically include all types of data.

The last parameter, `metrics`, can be omitted if desired. Any changes to it, or even the lack of it entirely, don't
appear
to affect the result of the request. hawk-js will include it as a precaution, but it appears to be completely unused.

```typescript
hawkClient.queryTimeseriesData(startTime, endTime, interval, extraStartTime, extraEndTime, metrics)
```

| Options        | Optional | Default                                                                              | Valid Values                                                                                                     |
|----------------|----------|--------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| accountNumber  | No       | N/A                                                                                  | `string`                                                                                                         |
| startTime      | No       | N/A                                                                                  | `string`                                                                                                         |
| endTime        | No       | N/A                                                                                  | `string`                                                                                                         |
| interval       | No       | N/A                                                                                  | `'1 hour' \| '1 day' \| '1 month'`                                                                               |
| extraStartTime | No       | N/A                                                                                  | `boolean`                                                                                                        |
| extraEndTime   | No       | N/A                                                                                  | `boolean`                                                                                                        |
| metrics        | Yes      | `{ electricUse: true, electricUseReading: true, temperature: true, rainfall: true }` | `{ ... }: {electricUse: boolean, electricUseReading: boolean, temperature: boolean, rainfall: boolean } \| null` |

</details>

<details>
<summary>Get Accounts</summary>

Gets all _utility_ accounts on your Utility/AquaHawk account.

```typescript
hawkClient.getAccounts(sort, secondarySort, dir, secondaryDir, page, start, limit)
```

| Options       | Optional | Default             | Valid Values                                                              |
|---------------|----------|---------------------|---------------------------------------------------------------------------|
| sort          | Yes      | `alertSeverityRank` | `'alertSeverityRank' \| 'lastActiveTime' \| 'updatedTime' \| 'savedTime'` |
| secondarySort | Yes      | `lastActiveTime`    | `'alertSeverityRank' \| 'lastActiveTime' \| 'updatedTime' \| 'savedTime'` |
| dir           | Yes      | `asc`               | `'desc' \| 'asc'`                                                         |
| secondaryDir  | Yes      | `desc`              | `'desc' \| 'asc'`                                                         |
| page          | Yes      | 1                   | `number`                                                                  |
| start         | Yes      | 0                   | `number`                                                                  |
| limit         | Yes      | 100                 | `number`                                                                  |

</details>

<details>
<summary>Get Alert Types</summary>

Get all possible alert types Utility/AquaHawk may send you. This is not to be confused with active alerts.

```typescript
hawkClient.getAlertTypes(page, start, limit)
```

| Options | Optional | Default | Valid Values |
|---------|----------|---------|--------------|
| page    | Yes      | 1       | `number`     |
| start   | Yes      | 0       | `number`     |
| limit   | Yes      | 100     | `number`     |

</details>

<details>
<summary>Get Alerts</summary>

Get active and historical alerts on your account. This includes all associated notes.

```typescript
hawkClient.getAlerts(accountNumber, sort, dir, page, start, limit)
```

| Options       | Optional | Default     | Valid Values                                                              |
|---------------|----------|-------------|---------------------------------------------------------------------------|
| accountNumber | No       | N/A         | `string`                                                                  |
| sort          | Yes      | `savedTime` | `'alertSeverityRank' \| 'lastActiveTime' \| 'updatedTime' \| 'savedTime'` |
| dir           | Yes      | `desc`      | `'desc' \| 'asc'`                                                         |
| page          | Yes      | 1           | `number`                                                                  |
| start         | Yes      | 0           | `number`                                                                  |
| limit         | Yes      | 100         | `number`                                                                  |

</details>

<details>
<summary>Get Alert Notes</summary>

Get all notes for active and historical alerts on your account. Doesn't include the alerting information, just the notes
from said alerts. See `#getAlerts()` to pull that information

```typescript
hawkClient.getAlertNotes(accountNumber, sort, dir, page, start, limit)
```

| Options       | Optional | Default     | Valid Values                                                              |
|---------------|----------|-------------|---------------------------------------------------------------------------|
| accountNumber | No       | N/A         | `string`                                                                  |
| sort          | Yes      | `savedTime` | `'alertSeverityRank' \| 'lastActiveTime' \| 'updatedTime' \| 'savedTime'` |
| dir           | Yes      | `desc`      | `'desc' \| 'asc'`                                                         |
| page          | Yes      | 1           | `number`                                                                  |
| start         | Yes      | 0           | `number`                                                                  |
| limit         | Yes      | 100         | `number`                                                                  |

</details>

<details>
<summary>Get Alert Severities</summary>

Get all possible alert severities Utility/AquaHawk may assign to alerts. This is not to be confused with active alert
severities.

```typescript
hawkClient.getAlertSeverities(page, start, limit)
```

| Options | Optional | Default | Valid Values |
|---------|----------|---------|--------------|
| page    | Yes      | 1       | `number`     |
| start   | Yes      | 0       | `number`     |
| limit   | Yes      | 25      | `number`     |

</details>

<details>
<summary>Get Meters</summary>

Get all meters on a utility account based on either your account ID or utility account number. Two separate methods
exist for this.

```typescript
hawkClient.getMeterByAccountID(accountId, sort, secondarySort, dir, secondaryDir, page, start, limit)
hawkClient.getMeterByAccountNumber(accountNumber, sort, dir, page, start, limit)
```

| Options       | Optional | Default                                                     | Valid Values                                                              |
|---------------|----------|-------------------------------------------------------------|---------------------------------------------------------------------------|
| accountId     | No       | N/A                                                         | `string`                                                                  |
| accountNumber | No       | N/A                                                         | `string`                                                                  |
| sort          | Yes      | `alertSeverityRank` OR `lastActiveTime` depending on method | `'alertSeverityRank' \| 'lastActiveTime' \| 'updatedTime' \| 'savedTime'` |
| secondarySort | Yes      | `lastActiveTime`                                            | `'alertSeverityRank' \| 'lastActiveTime' \| 'updatedTime' \| 'savedTime'` |
| dir           | Yes      | `desc`                                                      | `'desc' \| 'asc'`                                                         |
| secondaryDir  | Yes      | `desc`                                                      | `'desc' \| 'asc'`                                                         |
| page          | Yes      | 1                                                           | `number`                                                                  |
| start         | Yes      | 0                                                           | `number`                                                                  |
| limit         | Yes      | 100                                                         | `number`                                                                  |

</details>

<details>
<summary>Get Alert Settings</summary>

Get current account and meter alerting settings. See `#updateAlertSettings()` to update these settings.

```typescript
hawkClient.getAlertSeverities(accountId)
```

| Options | Optional | Default                                                       | Valid Values |
|---------|----------|---------------------------------------------------------------|--------------|
| account | Yes      | `getAuthInfo().body.activeUser?.attributes.accountIdArray[0]` | `string`     |

</details>

<details>
<summary>Update Alert Settings</summary>

Update account alerting settings. This is not as tested as the alerting settings configuration is not easily understood.
However, through testing with Postman this should work fine. Use at your own risk, nonetheless.

```typescript
hawkClient.updateAlertSettings(config, meterId)
```

| Options | Optional | Default | Valid Values                            |
|---------|----------|---------|-----------------------------------------|
| config  | No       | N/A     | `{ ... }: ThresholdAlertSettingsConfig` |
| meterId | Yes      | N/A     | `string`                                |

</details>

<details>
<summary>Get User Profile Settings</summary>

Retrieve your account settings. If you have multiple account Ids, you may provide one to retrieve specifically those
settings,

```typescript
hawkClient.getUserProfileSettings(accountId)
```

| Options   | Optional | Default                                                       | Valid Values |
|-----------|----------|---------------------------------------------------------------|--------------|
| accountId | Yes      | `getAuthInfo().body.activeUser?.attributes.accountIdArray[0]` | `string`     |

</details>

<details>
<summary>Change User Profile Settings</summary>

Updates settings for your account. An optional accountId parameter is provided for you to specify which account to
update if you have more than one.

The `updateInfo` object is a custom type, `RequireAtLeastOne`. Utility/AquaHawk requires a phone number on the account,
but whether it's a home phone,
cell phone, or work phone doesn't matter. This custom type ensures that at least one of those values is provided. If
none are, it will throw an error.
The base type is `AccountUpdateConfig`, and you can utilize that for your reference if needed.

```typescript
hawkClient.changeUserProfileSettings(contactPreference, updateInfo, accountId)
```

| Options           | Optional | Default | Valid Values                                                                                 |
|-------------------|----------|---------|----------------------------------------------------------------------------------------------|
| contactPreference | No       | N/A     | `'cellPhone' \| 'homePhone' \| 'email' \| 'workPhone' \| 'doNotContact' \| 'text'`           |
| updateInfo        | No       | N/A     | `{ ... }: RequireAtLeastOne<AccountUpdateConfig, 'cellPhone' \| 'homePhone' \| 'workPhone'>` |
| accountId         | Yes      | N/A     | `string`                                                                                     |

</details>

<details>
<summary>Register New Account</summary>

If you have another utility account you need to add to your Utility/AquaHawk account, register it with this method.

This always returns 200 even if it fails, be sure to check the `success` boolean in the body to actually determine
success.

```typescript
hawkClient.registerAccounts(account)
```

| Options | Optional | Default | Valid Values                 |
|---------|----------|---------|------------------------------|
| account | No       | N/A     | `{ ... }: AddAccountRequest` |

</details>

<details>
<summary>Remove Account</summary>

If you need to remove a utility account from your Utility/AquaHawk account, remove it with this method.

```typescript
hawkClient.removeAccount(account)
```

| Options | Optional | Default | Valid Values                    |
|---------|----------|---------|---------------------------------|
| account | No       | N/A     | `{ ... }: RemoveAccountRequest` |

</details>

<details>
<summary>Export Data To CSV</summary>

Requests an export of data for the specified time range and interval. Optionally provide an accountNumber to get just
data for that account.

The `firstTime` and `lastTime` strings within the `DataExportOptions` object are simply ISO8601 strings. You can craft
these using `new Date().toISOString()`.
This method _does not_ download the file, as the endpoint does not return file data, it just returns the file name of
the data that was exported. It will not return
anything until the export is complete, meaning the Promise this returns may take a long time to resolve.

You must call `#getExportedData()` after to retrieve your data. You may specify whether to get just the text or to save
the actual file.

```typescript
hawkClient.exportDataToCsv(exportSettings)
```

| Options       | Optional | Default | Valid Values                 |
|---------------|----------|---------|------------------------------|
| exportOptions | No       | N/A     | `{ ... }: DataExportOptions` |

</details>

<details>
<summary>Get Exported Data</summary>

Saves a previous export to a file. You must have requested the export with `#exportDataToCsv()` prior, or listed
previous exports with `#getReports()`.

From testing, it appears the only valid value for `type` is "Reports". I'm unsure if any others exist, so just use "
Reports" as that value.

```typescript
hawkClient.getExportedData(username, type, filename, fileSaveLocation, display)
```

It's recommended to call this within the `.then()` of the Promise that `#exportDataToCsv()` returns, since that method
can take a long time and the API will not respond until completed (instead of doing the smart thing like, say, returning
a 202).

```typescript
hawkClient.exportDataToCsv(exportSettings).then(async (data) => {
    await hawkClient.getExportedData(username, "Reports", data.filename)
})
```

| Option           | Optional | Default         | Valid Values |
|------------------|----------|-----------------|--------------|
| username         | No       | N/A             | `string`     |
| type             | No       | N/A             | "Reports"    |
| filename         | No       | N/A             | `string`     |
| fileSaveLocation | Yes      | `process.cwd()` | `string`     |
| display          | Yes      | N/A             | `boolean`    |

</details>

<details>
<summary>Get Reports</summary>

Gets a list of all previous reports that were exported. This endpoint does not export any files, you will need to call
`#getExportedData()` to actually retrieve them.

```typescript
hawkClient.getReports(page, start, limit)
```

| Option | Optional | Default | Valid Values |
|--------|----------|---------|--------------|
| page   | Yes      | 1       | `number`     |
| start  | Yes      | 0       | `number`     |
| limit  | Yes      | 25      | `number`     |

</details>

<details>
<summary>Change Password</summary>

Changes your account password. This assumes you're already authenticated to UtilityHawk/AquaHawk, meaning you don't have
to confirm your old password.
A second parameter, `confirmPassword`, is available if you want to ensure you're entering the same password twice (Say,
for user input)

This method will automatically update the password in the config for hawk-js. Be sure to provide the new password the
next time you create a hawk-js client object.

```typescript
hawkClient.changePassword(newPassword, confirmPassword)
```

| Options         | Optional | Default | Value Values |
|-----------------|----------|---------|--------------|
| newPassword     | No       | N/A     | `string`     |
| confirmPassword | Yes      | N/A     | `string`     |

</details>

# Tests

## All

Run both unit and functional tests. See note below about functional tests

```shell
pnpm run
```

# Unit

```shell
pnpm test:unit
```

## Functional

These tests make actual requests to the Utility/AquaHawk API. Specifically, they will authenticate, retrieve session
information, validate that token expiration is acceptable,
query timeseries data, and make a test export.

Because these are real queries, you must provide your credentials for your real account. Fill out the `.env.example`
file and rename it to `.env`. `dotenvx` will handle automatically loading them

```shell
pnpm test:functional
```

# Questions? Comments? Concerns?

Open an issue, that's what they're there for!

# Contributing

1. [Install pnpm](https://pnpm.io/installation) if you haven't already.
2. Install the latest LTS version of node using `pnpm env use --global lts`
3. Install all dependencies using `pnpm install`
4. Make your changes to hawk-js, **_and write unit tests for all changes_**
5. Lint using `pnpm lint` and ensure tests pass using `pnpm test`. If you submit a PR with failing tests or eslint
   warnings/errors, you will be required to fix them before the PR will be (and can be, as the main branch is protected
   until all tests pass) merged. If you need to override any ESLint rules, justification as to why and where needs to be
   provided in the PR (There is a place for it)
6. Create changeset, push, and create PR