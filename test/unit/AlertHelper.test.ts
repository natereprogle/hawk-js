// noinspection ES6PreferShortImport

import { convertToFriendlyConfig, convertToUsableConfig, createAlertSettingsString } from '../../src/AlertHelper'
import {
    accountsResponse,
    accountThresholdConfig,
    friendlyConfig,
    meterContinuousThresholdConfig,
    meterResponse,
    meterThresholdConfig,
} from './testData'
import { GetAccountsResponse, GetMetersResponse, ThresholdAlertSettingsConfig } from '../../src/types'

describe('AlertHelper', () => {
    test('convertToFriendlyConfig', () => {
        const config: ThresholdAlertSettingsConfig = convertToFriendlyConfig(accountsResponse as GetAccountsResponse, meterResponse as GetMetersResponse)
        expect(config).toEqual(friendlyConfig)
    })

    test('convertToUsableConfig', () => {
        const {
            accountThresholdConfig: accountConfig,
            meterThresholdConfig: meterConfig,
            meterContinuousThresholdConfig: meterContinuousConfig,
        } = convertToUsableConfig(friendlyConfig)
        expect(accountConfig).toEqual(accountThresholdConfig)
        expect(meterConfig).toEqual(meterThresholdConfig)
        expect(meterContinuousConfig).toEqual(meterContinuousThresholdConfig)
    })

    test('createAlertSettingsString', () => {
        const config: ThresholdAlertSettingsConfig = convertToFriendlyConfig(accountsResponse as GetAccountsResponse, meterResponse as GetMetersResponse)
        const alertSettingsString = createAlertSettingsString(config)
        expect(alertSettingsString).toEqual('$-TH Billing E-TH 1 Hour AlertSettingsApply')

        const tempAccountResponse = accountsResponse
        // @ts-ignore
        tempAccountResponse.accounts[0].alertSettings.billAmount.threshold['billing period'] = null
        let config2: ThresholdAlertSettingsConfig = convertToFriendlyConfig(tempAccountResponse as GetAccountsResponse, meterResponse as GetMetersResponse)
        const alertSettingsString2 = createAlertSettingsString(config2)
        expect(alertSettingsString2).toEqual('E-TH 1 Hour AlertSettingsApply')

        const tempMeterResponse = meterResponse
        // @ts-ignore
        tempMeterResponse.meters[0].alertSettings.electricUse.threshold.continuous.rate = '50'
        let config3: ThresholdAlertSettingsConfig = convertToFriendlyConfig(accountsResponse as GetAccountsResponse, tempMeterResponse as GetMetersResponse)
        const alertSettingsString3 = createAlertSettingsString(config3)
        expect(alertSettingsString3).toEqual('E-TH 1 Hour E-THC 24 Hour AlertSettingsApply')
    })
})