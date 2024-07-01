// noinspection ES6PreferShortImport
import {
    AccountThresholdAlertSettings,
    GetAccountsResponse,
    GetMetersResponse,
    HawkAuthResponse,
    HawkConfig,
    MeterContinuousThresholdAlertSettings,
    MeterThresholdAlertSettings,
    ThresholdAlertSettingsConfig,
} from '../../src/types'

// This is to allow partials within partials. Regular partials only work with "top level" properties within an object.
// If there are other objects within the partial, those objects but contain their full definitions.
type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

const config: HawkConfig = {
    districtName: 'mycity',
    password: 'password',
    username: 'email',
    platform: 'utilityhawk',
}

const authInfo: HawkAuthResponse = {
    sessionCookie: 'connect.sid=s%89fu8eAOFJ89y.f7893ufuf98HFUE7f9e39f38jFNKJFQ%r83f; Path=/; Expires=Mon, 01 Jul 2024 15:40:33 GMT; HttpOnly',
    body: {
        success: true,
        message: 'success',
        activeUser: {
            '__v': 0,
            '_id': '8feu8afu9es8auf9d7say9',
            attributes: {
                'accountIdArray': [
                    '8feu8afu9es8auf9f8d9as',
                ],
            },
            emailAddress: 'billy.bob@example.com',
            enabled: true,
            firstLoginTime: '2024-06-18T18:45:34.670Z',
            lastLoginTime: '2024-06-30T23:40:33.304Z',
            name: {
                'first': 'Billy',
                'last': 'Bob',
            },
            setupTime: '2024-06-18T18:45:31.157Z',
            updatedTime: '2024-06-18T18:46:49.792Z',
            username: 'billy.bob@example.com',
            contactPreference: {
                'email': true,
            },
            mailingAddress: {
                address: '123 Main St',
                city: 'New York',
                state: 'NY',
                zip: '10001',
            },
            cellPhone: {
                'areaCode': '555',
                'prefix': '123',
                'suffix': '4567',
            },
        },
    },
}

const badAuthInfo: HawkAuthResponse = {
    ...authInfo,
    sessionCookie: 'connect.sid=s%89fu8eAOFJ89y.f7893ufuf98HFUE7f9e39f38jFNKJFQ%r83f; Path=/; Expires=Mon, 01 Jul 2020 15:40:33 GMT; HttpOnly',
}

const alertConfig: ThresholdAlertSettingsConfig = {
    account: {
        billAmount: {
            threshold: {
                'billing period alert over': false,
                'billing period alert projected': false,
                'billing period': 0,
            },
        },
        waterUse: {
            threshold: {
                'billing period alert over': false,
                'billing period alert projected': false,
                'billing period': 0,
            },
        },
        electricUse: {
            threshold: {
                'billing period alert over': false,
                'billing period alert projected': false,
                'billing period': 0,
            },
        },
        naturalgasUse: {
            threshold: {
                'billing period alert over': false,
                'billing period alert projected': false,
                'billing period': 0,
            },
        },
        alertSettingsTag: 'alert settings here',
    },
    meter: {
        waterUse: {
            threshold: {
                hour: 0,
                day: 0,
                week: 0,
                month: 0,
            },
            limit: 0,
            sensitivity: null,
        },
        electricUse: {
            threshold: {
                hour: 0,
                day: 0,
                week: 0,
                month: 0,
            },
            limit: 0,
            sensitivity: null,
        },
        naturalgasUse: {
            threshold: {
                hour: 0,
                day: 0,
                week: 0,
                month: 0,
            },
            limit: 0,
            sensitivity: null,
        },
    },
    meterContinuous: {
        waterUse: {
            rate: 0,
            hours: '24',
        },
        electricUse: {
            rate: 0,
            hours: '24',
        },
        naturalgasUse: {
            rate: 0,
            hours: '24',
        },
    },
}

const accountsResponse: RecursivePartial<GetAccountsResponse> = {
    success: true,
    message: 'success',
    total: 1,
    accounts: [
        {
            alertSettings: {
                waterUse: {
                    threshold: {
                        'billing period alert projected': false,
                        'billing period alert over': true,
                        'billing period': null,
                    },
                },
                naturalgasUse: {
                    threshold: {
                        'billing period alert projected': false,
                        'billing period alert over': true,
                        'billing period': null,
                    },
                },
                electricUse: {
                    threshold: {
                        'billing period alert projected': false,
                        'billing period alert over': false,
                        'billing period': null,
                    },
                },
                billAmount: {
                    threshold: {
                        'billing period alert projected': true,
                        'billing period alert over': true,
                        'billing period': 100,
                    },
                },
                alertSettingsTag: 'E-TH 1 Hour $-TH Billing AlertSettingsApply',
            },
        },
    ],
}

const meterResponse: RecursivePartial<GetMetersResponse> = {
    'success': true,
    'message': 'success',
    'total': 1,
    'meters': [
        {
            'alertSettings': {
                'waterUse': {
                    'threshold': {
                        'week': null,
                        'month': null,
                        'hour': null,
                        'day': null,
                        'continuous': {
                            'rate': null,
                            'hours': '24',
                        },
                    },
                    'sensitivity': null!,
                    'limit': {
                        'hour': null,
                    },
                },
                'naturalgasUse': {
                    'threshold': {
                        'week': null,
                        'month': null,
                        'hour': null,
                        'day': null,
                        'continuous': {
                            'rate': null,
                            'hours': '24',
                        },
                    },
                    'sensitivity': null!,
                    'limit': {
                        'hour': null,
                    },
                },
                'electricUse': {
                    'threshold': {
                        'week': null,
                        'month': null,
                        'hour': 4.5,
                        'day': null,
                        'continuous': {
                            'rate': null,
                            'hours': '24',
                        },
                    },
                    'sensitivity': null!,
                    'limit': {
                        'hour': null,
                    },
                },
            },
        },
    ],
}

const accountThresholdConfig: AccountThresholdAlertSettings = {
    'alertSettings.billAmount.threshold.billing period alert over': true,
    'alertSettings.billAmount.threshold.billing period alert projected': true,
    'alertSettings.billAmount.threshold.billing period': 100,
    'alertSettings.waterUse.threshold.billing period alert over': true,
    'alertSettings.waterUse.threshold.billing period alert projected': false,
    'alertSettings.waterUse.threshold.billing period': null,
    'alertSettings.electricUse.threshold.billing period alert over': false,
    'alertSettings.electricUse.threshold.billing period alert projected': false,
    'alertSettings.electricUse.threshold.billing period': null,
    'alertSettings.naturalgasUse.threshold.billing period alert over': true,
    'alertSettings.naturalgasUse.threshold.billing period alert projected': false,
    'alertSettings.naturalgasUse.threshold.billing period': null,
    'alertSettings.alertSettingsTag': '',
}

const meterThresholdConfig: MeterThresholdAlertSettings = {
    'alertSettings.waterUse.threshold.hour': null,
    'alertSettings.waterUse.threshold.day': null,
    'alertSettings.waterUse.threshold.week': null,
    'alertSettings.waterUse.threshold.month': null,
    'alertSettings.waterUse.limit.hour': null,
    'alertSettings.waterUse.sensitivity': null,
    'alertSettings.electricUse.threshold.hour': 4.5,
    'alertSettings.electricUse.threshold.day': null,
    'alertSettings.electricUse.threshold.week': null,
    'alertSettings.electricUse.threshold.month': null,
    'alertSettings.electricUse.limit.hour': null,
    'alertSettings.electricUse.sensitivity': null,
    'alertSettings.naturalgasUse.threshold.hour': null,
    'alertSettings.naturalgasUse.threshold.day': null,
    'alertSettings.naturalgasUse.threshold.week': null,
    'alertSettings.naturalgasUse.threshold.month': null,
    'alertSettings.naturalgasUse.limit.hour': null,
    'alertSettings.naturalgasUse.sensitivity': null,
}

const meterContinuousThresholdConfig: MeterContinuousThresholdAlertSettings = {
    'alertSettings.waterUse.threshold.continuous.rate': null,
    'alertSettings.waterUse.threshold.continuous.hours': '24',
    'alertSettings.electricUse.threshold.continuous.rate': null,
    'alertSettings.electricUse.threshold.continuous.hours': '24',
    'alertSettings.naturalgasUse.threshold.continuous.rate': null,
    'alertSettings.naturalgasUse.threshold.continuous.hours': '24',
}

const friendlyConfig: ThresholdAlertSettingsConfig = {
    account: {
        billAmount: {
            threshold: {
                'billing period alert over': true,
                'billing period alert projected': true,
                'billing period': 100,
            },
        },
        waterUse: {
            threshold: {
                'billing period alert over': true,
                'billing period alert projected': false,
                'billing period': null,
            },
        },
        electricUse: {
            threshold: {
                'billing period alert over': false,
                'billing period alert projected': false,
                'billing period': null,
            },
        },
        naturalgasUse: {
            threshold: {
                'billing period alert over': true,
                'billing period alert projected': false,
                'billing period': null,
            },
        },
        alertSettingsTag: '$-TH Billing E-TH 1 Hour AlertSettingsApply',
    },
    meter: {
        waterUse: {
            threshold: {
                hour: null,
                day: null,
                week: null,
                month: null,
            },
            limit: null,
            sensitivity: null,
        },
        electricUse: {
            threshold: {
                hour: 4.5,
                day: null,
                week: null,
                month: null,
            },
            limit: null,
            sensitivity: null,
        },
        naturalgasUse: {
            threshold: {
                hour: null,
                day: null,
                week: null,
                month: null,
            },
            limit: null,
            sensitivity: null,
        },
    },
    meterContinuous: {
        waterUse: {
            rate: null,
            hours: '24',
        },
        electricUse: {
            rate: null,
            hours: '24',
        },
        naturalgasUse: {
            rate: null,
            hours: '24',
        },
    },
}

function toISO8601WithTimezone(date: Date) {
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

export {
    config,
    authInfo,
    badAuthInfo,
    alertConfig,
    accountsResponse,
    meterResponse,
    accountThresholdConfig,
    meterThresholdConfig,
    meterContinuousThresholdConfig,
    friendlyConfig,
    toISO8601WithTimezone,
}