// noinspection ES6PreferShortImport

import * as dotenvx from '@dotenvx/dotenvx'
import { HawkClient } from '../../src/index'
import { toISO8601WithTimezone } from '../unit/testData'
import { DataExportOptions } from '../../src/types'

dotenvx.config()

const { HAWK_USERNAME, HAWK_PASSWORD, HAWK_DISTRICT, HAWK_PLATFORM, HAWK_ACCOUNT } = process.env
if (!HAWK_USERNAME || !HAWK_PASSWORD || !HAWK_DISTRICT || !HAWK_PLATFORM || !HAWK_ACCOUNT) {
    throw new Error('Missing environment config for functional tests')
}

let hawkClient: HawkClient

describe('HawkJs', () => {
    beforeEach(async () => {
        hawkClient = HawkClient.create({
            username: HAWK_USERNAME,
            password: HAWK_PASSWORD,
            districtName: HAWK_DISTRICT,
            platform: HAWK_PLATFORM as 'utilityhawk' | 'aquahawk',
        })

        await hawkClient.forceSessionRefresh()
    })

    it('should authenticate', async () => {
        expect(hawkClient.getSessionInformation().body.success).toBe(true)
    })

    it('should have a valid token', async () => {
        expect(await hawkClient.getTokenExpirationTime() > Date.now()).toBe(true)
    })

    it('should get timeseries data', async () => {
        const date = new Date()
        const dateMinus5Days = new Date(date.setDate(date.getDate() - 5))

        const data = await hawkClient.queryTimeseriesData(HAWK_ACCOUNT, toISO8601WithTimezone(date), toISO8601WithTimezone(dateMinus5Days), '1 hour', true, true, {
            electricUse: true,
            electricUseReading: true,
            temperature: true,
            rainfall: true,
        })

        expect(data.success).toBe(true)
        expect(data.total).toBeGreaterThan(0)
    })

    it('should export and download data', async () => {
        const date = new Date()
        const dateMinus5Days = new Date(date.setDate(date.getDate() - 5))

        const exportSettings: DataExportOptions = {
            firstTime: dateMinus5Days.toISOString(),
            lastTime: date.toISOString(),
            interval: '1 hour',
            districtName: HAWK_DISTRICT,
        }

        const data = await hawkClient.exportDataToCsv(exportSettings)
        expect(data.success).toBe(true)
        expect(data.filename).toContain('.csv')

        const success = await hawkClient.getExportedData(HAWK_USERNAME, 'Reports', data.filename)
        expect(success).toBe(true)
    })

    it('should get a list of reports', async () => {
        const data = await hawkClient.getReports()
        expect(data.success).toBe(true)
        expect(data.total).toBeGreaterThan(0)
    })
})
