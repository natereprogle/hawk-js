import {
    AccountThresholdAlertSettings,
    GetAccountsResponse,
    GetMetersResponse,
    MeterContinuousThresholdAlertSettings,
    MeterThresholdAlertSettings,
    ThresholdAlertSettingsConfig,
} from './types'

export function convertToFriendlyConfig(accounts: GetAccountsResponse, meters: GetMetersResponse) {
    const config: ThresholdAlertSettingsConfig = {
        account: {
            billAmount: {
                threshold: {
                    'billing period alert over': accounts.accounts[0]?.alertSettings.billAmount.threshold['billing period alert over'] ?? false,
                    'billing period alert projected': accounts.accounts[0]?.alertSettings.billAmount.threshold['billing period alert projected'] ?? false,
                    'billing period': accounts.accounts[0]?.alertSettings.billAmount.threshold['billing period'] ?? null,
                },
            },
            waterUse: {
                threshold: {
                    'billing period alert over': accounts.accounts[0]?.alertSettings.waterUse.threshold['billing period alert over'] ?? false,
                    'billing period alert projected': accounts.accounts[0]?.alertSettings.waterUse.threshold['billing period alert projected'] ?? false,
                    'billing period': accounts.accounts[0]?.alertSettings.waterUse.threshold['billing period'] ?? null,
                },
            },
            electricUse: {
                threshold: {
                    'billing period alert over': accounts.accounts[0]?.alertSettings.electricUse.threshold['billing period alert over'] ?? false,
                    'billing period alert projected': accounts.accounts[0]?.alertSettings.electricUse.threshold['billing period alert projected'] ?? false,
                    'billing period': accounts.accounts[0]?.alertSettings.electricUse.threshold['billing period'] ?? null,
                },
            },
            naturalgasUse: {
                threshold: {
                    'billing period alert over': accounts.accounts[0]?.alertSettings.naturalgasUse.threshold['billing period alert over'] ?? false,
                    'billing period alert projected': accounts.accounts[0]?.alertSettings.naturalgasUse.threshold['billing period alert projected'] ?? false,
                    'billing period': accounts.accounts[0]?.alertSettings.naturalgasUse.threshold['billing period'] ?? null,
                },
            },
            alertSettingsTag: '',
        },
        meter: {
            waterUse: {
                threshold: {
                    hour: meters.meters[0]?.alertSettings.waterUse.threshold.hour ?? null,
                    day: meters.meters[0]?.alertSettings.waterUse.threshold.day ?? null,
                    week: meters.meters[0]?.alertSettings.waterUse.threshold.week ?? null,
                    month: meters.meters[0]?.alertSettings.waterUse.threshold.month ?? null,
                },
                limit: meters.meters[0]?.alertSettings.waterUse.limit.hour ?? null,
                sensitivity: meters.meters[0]?.alertSettings.waterUse.sensitivity ?? null,
            },
            electricUse: {
                threshold: {
                    hour: meters.meters[0]?.alertSettings.electricUse.threshold.hour ?? null,
                    day: meters.meters[0]?.alertSettings.electricUse.threshold.day ?? null,
                    week: meters.meters[0]?.alertSettings.electricUse.threshold.week ?? null,
                    month: meters.meters[0]?.alertSettings.electricUse.threshold.month ?? null,
                },
                limit: meters.meters[0]?.alertSettings.electricUse.limit.hour ?? null,
                sensitivity: meters.meters[0]?.alertSettings.electricUse.sensitivity ?? null,
            },
            naturalgasUse: {
                threshold: {
                    hour: meters.meters[0]?.alertSettings.naturalgasUse.threshold.hour ?? null,
                    day: meters.meters[0]?.alertSettings.naturalgasUse.threshold.day ?? null,
                    week: meters.meters[0]?.alertSettings.naturalgasUse.threshold.week ?? null,
                    month: meters.meters[0]?.alertSettings.naturalgasUse.threshold.month ?? null,
                },
                limit: meters.meters[0]?.alertSettings.naturalgasUse.limit.hour ?? null,
                sensitivity: meters.meters[0]?.alertSettings.naturalgasUse.sensitivity ?? null,
            },
        },
        meterContinuous: {
            waterUse: {
                rate: meters.meters[0]?.alertSettings.waterUse.threshold.continuous.rate ?? null,
                hours: meters.meters[0]?.alertSettings.waterUse.threshold.continuous.hours ?? '24',
            },
            electricUse: {
                rate: meters.meters[0]?.alertSettings.electricUse.threshold.continuous.rate ?? null,
                hours: meters.meters[0]?.alertSettings.electricUse.threshold.continuous.hours ?? '24',
            },
            naturalgasUse: {
                rate: meters.meters[0]?.alertSettings.naturalgasUse.threshold.continuous.rate ?? null,
                hours: meters.meters[0]?.alertSettings.naturalgasUse.threshold.continuous.hours ?? '24',
            },
        },
    }

    config.account.alertSettingsTag = createAlertSettingsString(config)

    return config
}

export function convertToUsableConfig(config: ThresholdAlertSettingsConfig): {
    accountThresholdConfig: AccountThresholdAlertSettings,
    meterThresholdConfig: MeterThresholdAlertSettings,
    meterContinuousThresholdConfig: MeterContinuousThresholdAlertSettings
} {
    const accountThresholdConfig: AccountThresholdAlertSettings = {
        'alertSettings.billAmount.threshold.billing period alert over': config.account.billAmount.threshold['billing period alert over'],
        'alertSettings.billAmount.threshold.billing period alert projected': config.account.billAmount.threshold['billing period alert projected'],
        'alertSettings.billAmount.threshold.billing period': config.account.billAmount.threshold['billing period'] ?? 0,
        'alertSettings.waterUse.threshold.billing period alert over': config.account.waterUse.threshold['billing period alert over'],
        'alertSettings.waterUse.threshold.billing period alert projected': config.account.waterUse.threshold['billing period alert projected'],
        'alertSettings.waterUse.threshold.billing period': config.account.waterUse.threshold['billing period'],
        'alertSettings.electricUse.threshold.billing period alert over': config.account.electricUse.threshold['billing period alert over'],
        'alertSettings.electricUse.threshold.billing period alert projected': config.account.electricUse.threshold['billing period alert projected'],
        'alertSettings.electricUse.threshold.billing period': config.account.electricUse.threshold['billing period'],
        'alertSettings.naturalgasUse.threshold.billing period alert over': config.account.naturalgasUse.threshold['billing period alert over'],
        'alertSettings.naturalgasUse.threshold.billing period alert projected': config.account.naturalgasUse.threshold['billing period alert projected'],
        'alertSettings.naturalgasUse.threshold.billing period': config.account.naturalgasUse.threshold['billing period'],
        'alertSettings.alertSettingsTag': '',
    }
    const meterThresholdConfig: MeterThresholdAlertSettings = {
        'alertSettings.waterUse.threshold.hour': config.meter.waterUse.threshold.hour,
        'alertSettings.waterUse.threshold.day': config.meter.waterUse.threshold.day,
        'alertSettings.waterUse.threshold.week': config.meter.waterUse.threshold.week,
        'alertSettings.waterUse.threshold.month': config.meter.waterUse.threshold.month,
        'alertSettings.waterUse.limit.hour': config.meter.waterUse.limit,
        'alertSettings.waterUse.sensitivity': config.meter.waterUse.sensitivity,
        'alertSettings.electricUse.threshold.hour': config.meter.electricUse.threshold.hour,
        'alertSettings.electricUse.threshold.day': config.meter.electricUse.threshold.day,
        'alertSettings.electricUse.threshold.week': config.meter.electricUse.threshold.week,
        'alertSettings.electricUse.threshold.month': config.meter.electricUse.threshold.month,
        'alertSettings.electricUse.limit.hour': config.meter.electricUse.limit,
        'alertSettings.electricUse.sensitivity': config.meter.electricUse.sensitivity,
        'alertSettings.naturalgasUse.threshold.hour': config.meter.naturalgasUse.threshold.hour,
        'alertSettings.naturalgasUse.threshold.day': config.meter.naturalgasUse.threshold.day,
        'alertSettings.naturalgasUse.threshold.week': config.meter.naturalgasUse.threshold.week,
        'alertSettings.naturalgasUse.threshold.month': config.meter.naturalgasUse.threshold.month,
        'alertSettings.naturalgasUse.limit.hour': config.meter.naturalgasUse.limit,
        'alertSettings.naturalgasUse.sensitivity': config.meter.naturalgasUse.sensitivity,
    }
    const meterContinuousThresholdConfig: MeterContinuousThresholdAlertSettings = {
        'alertSettings.waterUse.threshold.continuous.rate': config.meterContinuous.waterUse.rate,
        'alertSettings.waterUse.threshold.continuous.hours': config.meterContinuous.waterUse.hours,
        'alertSettings.electricUse.threshold.continuous.rate': config.meterContinuous.electricUse.rate,
        'alertSettings.electricUse.threshold.continuous.hours': config.meterContinuous.electricUse.hours,
        'alertSettings.naturalgasUse.threshold.continuous.rate': config.meterContinuous.naturalgasUse.rate,
        'alertSettings.naturalgasUse.threshold.continuous.hours': config.meterContinuous.naturalgasUse.hours,
    }

    return { accountThresholdConfig, meterThresholdConfig, meterContinuousThresholdConfig }
}

export function createAlertSettingsString(config: ThresholdAlertSettingsConfig): string | null {
    let alertSettingsString = ''
    const meterThresholds = config.meter.electricUse.threshold

    if (config.account.billAmount.threshold['billing period']) {
        alertSettingsString += '$-TH Billing '
    }

    for (const threshold in meterThresholds) {
        if (typeof meterThresholds[threshold as 'hour' | 'day' | 'week' | 'month'] === 'number') {
            alertSettingsString += `E-TH 1 ${threshold.charAt(0).toUpperCase() + threshold.slice(1)} `
        }
    }

    if (config.meterContinuous.electricUse.rate) {
        alertSettingsString += `E-THC ${config.meterContinuous.electricUse.hours ?? '24'} Hour `
    }

    if (alertSettingsString === '') {
        return null
    }

    return alertSettingsString + 'AlertSettingsApply'
}

export function toISO8601WithTimezone(date: Date) {
    const pad = (num: number) => String(num).padStart(2, '0')

    const year = date.getFullYear()
    const month = pad(date.getMonth() + 1)
    const day = pad(date.getDate())
    const hours = pad(date.getHours())
    const minutes = pad(date.getMinutes())
    const seconds = pad(date.getSeconds())

    const timezoneOffset = -date.getTimezoneOffset()
    const offsetSign = timezoneOffset >= 0 ? '+' : '-'
    const offsetHours = pad(Math.floor(Math.abs(timezoneOffset) / 60))
    const offsetMinutes = pad(Math.abs(timezoneOffset) % 60)

    return `${year.toString()}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSign}${offsetHours}:${offsetMinutes}`
}