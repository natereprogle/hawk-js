// noinspection DuplicatedCode

/*
 * Copyright (c) TerrorByte 2024.
 * This program is free software: You can redistribute it and/or modify it under the terms of the
 * Mozilla Public License 2.0 as published by the Mozilla under the Mozilla Foundation.
 *
 * This program is distributed in the hope that it will be useful, but provided on an "as is" basis,
 * without warranty of any kind, either expressed, implied, or statutory, including,
 * without limitation, warranties that the Covered Software is free of defects, merchantable,
 * fit for a particular purpose or non-infringing. See the MPL 2.0 license for more details.
 *
 * For a full copy of the license in its entirety, please visit <https://www.mozilla.org/en-US/MPL/2.0/>
 */

interface HawkAuthResponseBody {
    success: boolean;
    message: string;
    activeUser: {
        __v: number;
        _id: string;
        attributes: {
            accountIdArray: string[];
        };
        emailAddress: string;
        enabled: boolean;
        firstLoginTime: string;
        lastLoginTime: string;
        name: {
            first: string;
            last: string;
        };
        setupTime: string;
        updatedTime: string;
        username: string;
        contactPreference: Record<string, boolean>;
        mailingAddress: {
            address: string;
            city: string;
            state: string;
            zip: string;
        };
        cellPhone: {
            areaCode: string;
            prefix: string;
            suffix: string;
        };
    } | null;
    errors?: string[];
}

interface HawkConfig {
    username: string;
    password: string;
    districtName: string;
    platform: 'utilityhawk' | 'aquahawk';
}

interface HawkAuthResponse {
    sessionCookie: string;
    body: HawkAuthResponseBody;
}

interface GetAccountsResponse {
    success: boolean
    message: string
    total: number
    accounts: {
        registeredUsers: {
            updatedTime: string
            setupTime: string
            _id: string
            emailAddress: string
            enabled: boolean
            name: {
                first: string
                last: string
            }
            username: string
            contactPreference: {
                email: boolean
            }
            mailingAddress: {
                address: string
                city: string
                state: string
                zip: string
            }
            cellPhone: {
                areaCode: string
                prefix: string
                suffix: string
            }
        }[]
        totalRegisteredUsers: number
        __v: number
        _id: string
        accountNumber: string
        accountType: string
        alertCount: number
        alertNotifiedTime: string
        alertSettings: {
            waterUse: {
                threshold: {
                    'billing period alert projected': boolean
                    'billing period alert over': boolean
                    'billing period': number | null
                }
            }
            naturalgasUse: {
                threshold: {
                    'billing period alert projected': boolean
                    'billing period alert over': boolean
                    'billing period': number | null
                }
            }
            electricUse: {
                threshold: {
                    'billing period alert projected': boolean
                    'billing period alert over': boolean
                    'billing period': number | null
                }
            }
            billAmount: {
                threshold: {
                    'billing period alert projected': boolean
                    'billing period alert over': boolean
                    'billing period': number | null
                }
            }
            alertSettingsTag: string
        }
        alertUpdatedTime: string
        attributes: {
            Route: string
            accountType: string
            'Payment Balance': string
            'Payment Due Date': string
            'Location ID': string
            'Number Of Units': string
            'Billing Cycle': string
            'File Account Description': string
            'Account Type': string
            'File Account Type': string
            'Account Status': string
            'Record Version': string
            'Record Type': string
            userIdArray: string[]
            userIdCount: number
            'Phone Number': string
            'Email Address': string
        }
        districtId: {
            _id: string
            name: string
        }
        districtName: string
        firstActiveTime: string
        firstName: string
        firstUpdateTime: string
        lastActiveTime: string
        lastName: string
        lastUpdateTime: string
        locked: {
            alertSettings: {
                waterUse: {
                    threshold: {
                        'billing period alert projected': boolean
                        'billing period alert over': boolean
                        'billing period': boolean
                    }
                }
                naturalgasUse: {
                    threshold: {
                        'billing period alert projected': boolean
                        'billing period alert over': boolean
                        'billing period': boolean
                    }
                }
                electricUse: {
                    threshold: {
                        'billing period alert projected': boolean
                        'billing period alert over': boolean
                        'billing period': boolean
                    }
                }
                billAmount: {
                    threshold: {
                        'billing period alert projected': boolean
                        'billing period alert over': boolean
                        'billing period': boolean
                    }
                }
                alertSettingsTag: boolean
            }
        }
        metricActiveTimes: {
            electricUse: {
                lastActiveTime: string
                firstActiveTime: string
            }
        }
        metricAggregates: {
            billAmount: {
                projected: {
                    'billing period': {
                        'Electric Use Tier1 103': {
                            label: string
                            labelOrder: number
                            amount: number
                        }
                        'Electric Base 103': {
                            label: string
                            labelOrder: number
                            amount: number
                        }
                        total: number
                    }
                }
                current: {
                    'billing period': {
                        'Electric Use Tier1 103': {
                            label: string
                            labelOrder: number
                            amount: number
                        }
                        'Electric Base 103': {
                            label: string
                            labelOrder: number
                            amount: number
                        }
                        total: number
                    }
                }
            }
            alertFactor: {
                mixed: {
                    total: number
                    alertFactorThresholdTotal: number
                    electricUse: {
                        total: number
                        alertFactorThresholdTotal: number
                        alertFactorThreshold: {
                            '1 hour': number
                        }
                    }
                }
            }
            electricUse: {
                projected: {
                    'billing period': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                }
                current: {
                    '1 week': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 month': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 quarter': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 year': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    'billing period': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '45 days': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '7 days': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 day': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '24 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '16 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '8 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '4 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                }
                prior: {
                    '1 week': {
                        sumPos: number
                        'kilowatt hours': number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 month': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '45 days': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    'billing period': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '7 days': {
                        sumPos: number
                        'kilowatt hours': number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 day': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '24 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '16 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '8 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '4 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 hour': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                }
            }
            electricUseActual: {
                current: {
                    '1 week': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 month': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 quarter': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 year': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    'billing period': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '45 days': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '7 days': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 day': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '24 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '16 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '8 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '4 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                }
                prior: {
                    '1 week': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 month': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '45 days': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    'billing period': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '7 days': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 day': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '24 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '16 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '8 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '4 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 hour': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                }
            }
        }
        name: string
        openTime: string
        rate: string[]
        regExSearch: string
        active: boolean
        period: {
            startTime: string
            endTime: string
            text: string
        }[]
        mailingAddress: {
            streetName: string
            streetNumber: number
            address: string
            city: string
            state: string
            zip: string
        }
        serviceAddress: {
            streetName: string
            streetNumber: number
            address: string
            city: string
            state: string
            zip: string
        }
        meterNumbers: {
            meterId: string
            meterNumber: string
            firstTime: string
            lastTime: string
        }[]
    }[]
    _id: string | null
    totalRegUsers: number
    totalAccountWithRegUsers: number
    totalAccounts: number
}


interface TimeseriesMetrics {
    electricUse: boolean;
    electricUseReading: boolean;
    temperature: boolean;
    rainfall: boolean;
}

interface TimeseriesResponse {
    success: boolean;
    message: string;
    total: number;
    timeseries: {
        interval: '1 day' | '1 hour' | '1 month';
        timezone: string;
        timestamp: string;
        startTime: string;
        endTime: string;
        msec: number;
        electricUseActual: {
            num: number;
            min: string;
            max: string;
            sum: string;
            sumSq: string;
            sumIx: string;
            sumPos: string;
            'kilowatt hours': string;
        };
        electricUse: {
            num: number;
            min: string;
            max: string;
            sum: string;
            sumSq: string;
            sumIx: string;
            sumPos: string;
            'kilowatt hours': string;
        };
        rainfall: {
            num: number;
            min: string;
            max: string;
            sum: string;
            sumSq: string;
            sumIx: string;
            inches: number;
            centimeters: number;
            millimeters: number;
        };
        highTemp: {
            num: number;
            min: string;
            max: string;
            sum: string;
            sumSq: string;
            sumIx: string;
            sumPos: string;
            degree: number;
            fahrenheit: number;
            celsius: number;
        };
        lowTemp: {
            num: number;
            min: string;
            max: string;
            sum: string;
            sumSq: string;
            sumIx: string;
            sumPos: string;
            degree: number;
            fahrenheit: number;
            celsius: number;
        };
        avgTemp: {
            num: number;
            min: string;
            max: string;
            sum: string;
            sumSq: string;
            sumIx: string;
            sumPos: string;
            degree: number;
            fahrenheit: number;
            celsius: number;
        };
    }[];
    firstTime: string;
    lastTime: string;
}

interface AlertTypes {
    success: boolean;
    message: string;
    total: number;
    types: {
        '_id': number;
        sortRank: number;
        enabled: boolean;
        typeName: string;
        typeNameDisplay: string;
        typeNameLocale: {
            en: string;
            fr: string;
            es: string;
        };
        typeDescription: string;
        typeDescriptionDisplay: string;
        typeDescriptionLocale: {
            en: string;
            fr: string;
            es: string;
        };
        alertDescriptionsLocale: {
            en: string[];
            fr: string[];
            es: string[];
        };
        icon: string;
        iconCls: string;
        '__v': number;
        alertDescriptionsDisplay: string[];
        alertDescriptions: string[];
    }[]
}

interface AlertsResponse {
    success: boolean
    message: string
    total: number
    alerts: {
        notes: {
            _id: string
            details?: {
                subject: string
                message: string
                to: string
            }
            text: string
            updatedTime: string
            savedTime: string
            alertId: string
            meterId: string
            accountId: string
            districtId: string
            attributes: {
                email?: boolean
                closed?: boolean
                threshold?: boolean
            }
            notifiedTime?: string
            __v: number
            textLocale: {
                noteTypeId: number
                noteTypeValues: {
                    metricText: string
                    metricTextLocale: string
                    metricUnits: string
                    metricUnitsLocale: string
                    aftIntervalAggregatesValue: number
                    aftIntervalAggregatesThreshold: number
                    aftIntervalAggregatesAftTime: number
                    aftIntervalAggregatesInterval: string
                    timeIntervalName: string
                    timeIntervalNameLocale: string
                }
            }[]
        }[]
        __v: number
        _id: string
        accountId: {
            _id: string
            accountNumber: string
        }
        alertSeverityId: {
            _id: number
            severityRank: number
            severityName: string
            severityNameDisplay: string
            severityNameLocale: {
                en: string
                fr: string
                es: string
            }
            icon: string
            iconCls: string
        }
        alertText: string
        alertTime: string
        alertTypeId: {
            _id: number
            sortRank: number
            typeName: string
            typeNameDisplay: string
            typeNameLocale: {
                en: string
                fr: string
                es: string
            }
            typeDescription: string
            typeDescriptionDisplay: string
            typeDescriptionLocale: {
                en: string
                fr: string
                es: string
            }
            alertDescriptionsLocale: {
                en: string[]
                fr: string[]
                es: string[]
            }
            icon: string
            iconCls: string
            alertDescriptionsDisplay: string[]
            alertDescriptions: string[]
        }
        attributes: {
            threshold: boolean
            email: boolean
            closed: boolean
            alertTextIndex: number
        }
        closedTime: string
        districtId: {
            _id: string
            name: string
        }
        meterId: {
            _id: string
            meterNumber: string
        }
        notifiedTime: string
        openedTime: string
        updatedTime: string
        stateTags: {
            startTime: number
            endTime: number
            metric: string
            interval: string
            threshold: number
        }[]
    }[]
}

interface AlertsNotesResponse {
    success: boolean
    message: string
    total: number
    notes: {
        _id: string
        details?: {
            subject: string
            message: string
            to: string
        }
        text: string
        updatedTime: string
        savedTime: string
        alertId: string
        meterId: {
            _id: string
            meterNumber: string
        }
        accountId: {
            _id: string
            accountNumber: string
        }
        districtId: {
            _id: string
            name: string
        }
        attributes: {
            email?: boolean
            closed?: boolean
            threshold?: boolean
        }
        notifiedTime?: string
        __v: number
        textLocale: {
            noteTypeId: number
            noteTypeValues: {
                metricText: string
                metricTextLocale: string
                metricUnits: string
                metricUnitsLocale: string
                aftIntervalAggregatesValue: number
                aftIntervalAggregatesThreshold: number
                aftIntervalAggregatesAftTime: number
                aftIntervalAggregatesInterval: string
                timeIntervalName: string
                timeIntervalNameLocale: string
            }
        }[]
    }[]
}

interface AlertSeveritiesResponse {
    success: boolean
    message: string
    total: number
    severities: {
        _id: number
        enabled: boolean
        severityRank: number
        severityName: string
        severityNameDisplay: string
        severityNameLocale: {
            en: string
            fr: string
            es: string
        }
        icon: string
        iconCls: string
        resolvedIcon: string
        resolvedIconCls: string
        followupIcon: string
        followupIconCls: string
        reassignIcon: string
        reassignIconCls: string
        __v: number
    }[]
}

interface GetMetersResponse {
    success: boolean
    message: string
    total: number
    meters: {
        __v: number
        _id: string
        accountId: {
            _id: string
            accountNumber: string
        }
        accountNumber: string
        alertCount: number
        alertNotifiedTime: string
        alertSettings: {
            waterUse: {
                threshold: {
                    week: number | null
                    month: number | null
                    hour: number | null
                    day: number | null
                    continuous: {
                        rate: number | null
                        hours: '4' | '8' | '16' | '24' | null
                    }
                }
                sensitivity: unknown
                limit: {
                    hour: number | null
                }
            }
            naturalgasUse: {
                threshold: {
                    week: number | null
                    month: number | null
                    hour: number | null
                    day: number | null
                    continuous: {
                        rate: number | null
                        hours: '4' | '8' | '16' | '24' | null
                    }
                }
                sensitivity: unknown
                limit: {
                    hour: number | null
                }
            }
            electricUse: {
                threshold: {
                    week: number | null
                    month: number | null
                    hour: number | null
                    day: number | null
                    continuous: {
                        rate: number | null
                        hours: '4' | '8' | '16' | '24' | null
                    }
                }
                sensitivity: unknown
                limit: {
                    hour: number | null
                }
            }
        }
        alertUpdatedTime: string
        attributes: {
            EMRID: string
            EMRType: string
            MXUType: string
            'Rate Description': string
            'Service Description': string
            'Accts Mult Setting': string
            'Meter Type Description': string
            'File Meter Multiplier': string
            'File Meter Type': string
            'Meter Status': string
        }
        districtId: {
            _id: string
            name: string
        }
        districtName: string
        firstActiveTime: string
        lastActiveTime: string
        locked: {
            alertSettings: {
                waterUse: {
                    threshold: {
                        week: number | null
                        month: number | null
                        hour: number | null
                        day: number | null
                        continuous: {
                            rate: number | null
                            hours: string
                        }
                    }
                    sensitivity: unknown
                    limit: {
                        hour: number | null
                    }
                }
                naturalgasUse: {
                    threshold: {
                        week: number | null
                        month: number | null
                        hour: number | null
                        day: number | null
                        continuous: {
                            rate: boolean | number | null
                            hours: string
                        }
                    }
                    sensitivity: unknown
                    limit: {
                        hour: boolean | null
                    }
                }
                electricUse: {
                    threshold: {
                        week: boolean | null
                        month: boolean | null
                        hour: boolean | null
                        day: boolean | null
                        continuous: {
                            rate: boolean | number | null
                            hours: string
                        }
                    }
                    sensitivity: unknown
                    limit: {
                        hour: boolean | null
                    }
                }
            }
        }
        meterDescription: string
        meterNumber: string
        metricActiveTimes: {
            electricUse: {
                lastActiveTime: string
                firstActiveTime: string
            }
        }
        metricAggregates: {
            alertFactor: {
                mixed: {
                    total: number
                    alertFactorThresholdTotal: number
                    electricUse: {
                        total: number
                        alertFactorThresholdTotal: number
                        alertFactorThreshold: {
                            '1 hour': number
                        }
                    }
                }
                current: {
                    total: number
                    alertFactorThresholdTotal: number
                    electricUse: {
                        total: number
                        alertFactorThresholdTotal: number
                        alertFactorThreshold: {
                            '1 hour': number
                            '1 hour aft': {
                                endTime: string
                                startTime: string
                                aftTime: string
                                interval: string
                                threshold: number
                                value: number
                            }[]
                        }
                    }
                }
            }
            electricUse: {
                projected: {
                    'billing period': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                }
                current: {
                    '1 week': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 month': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 quarter': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 year': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    'billing period': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '45 days': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '7 days': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 day': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '24 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '16 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '8 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '4 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                }
                prior: {
                    '1 week': {
                        sumPos: number
                        'kilowatt hours': number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 month': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '45 days': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    'billing period': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '7 days': {
                        sumPos: number
                        'kilowatt hours': number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 day': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '24 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '16 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '8 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '4 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 hour': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                }
            }
            electricUseActual: {
                current: {
                    '1 week': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 month': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 quarter': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 year': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    'billing period': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '45 days': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '7 days': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 day': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '24 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '16 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '8 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '4 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                }
                prior: {
                    '1 week': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 month': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '45 days': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    'billing period': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '7 days': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 day': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '24 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '16 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '8 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '4 hours': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 hour': {
                        'kilowatt hours': number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                }
            }
            electricUseReading: {
                prior: {
                    '1 week': {
                        'kilowatt hours': number
                        reading: number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 month': {
                        'kilowatt hours': number
                        reading: number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '45 days': {
                        'kilowatt hours': number
                        reading: number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    'billing period': {
                        'kilowatt hours': number
                        reading: number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '7 days': {
                        'kilowatt hours': number
                        reading: number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 day': {
                        'kilowatt hours': number
                        reading: number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '24 hours': {
                        'kilowatt hours': number
                        reading: number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '16 hours': {
                        'kilowatt hours': number
                        reading: number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                }
                current: {
                    '1 week': {
                        'kilowatt hours': number
                        reading: number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 month': {
                        'kilowatt hours': number
                        reading: number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 quarter': {
                        'kilowatt hours': number
                        reading: number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 year': {
                        'kilowatt hours': number
                        reading: number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    'billing period': {
                        'kilowatt hours': number
                        reading: number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '45 days': {
                        'kilowatt hours': number
                        reading: number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '7 days': {
                        'kilowatt hours': number
                        reading: number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 day': {
                        'kilowatt hours': number
                        reading: number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '24 hours': {
                        'kilowatt hours': number
                        reading: number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '16 hours': {
                        'kilowatt hours': number
                        reading: number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '8 hours': {
                        'kilowatt hours': number
                        reading: number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '4 hours': {
                        'kilowatt hours': number
                        reading: number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                    '1 hour': {
                        'kilowatt hours': number
                        reading: number
                        sumPos: number
                        sumIx: number
                        sumSq: number
                        sum: number
                        max: number
                        min: number
                        num: number
                    }
                }
            }
        }
        multiplier: number
        radioNumber: string
        rate: string[]
        regExSearch: string
        type: string
        units: string
        active: boolean
        period: unknown[]
        accountNumbers: {
            accountId: string
            accountNumber: string
            firstTime: string
            lastTime: string
        }[]
    }[]
}

interface AccountThresholdAlertSettings {
    'alertSettings.billAmount.threshold.billing period alert over': boolean
    'alertSettings.billAmount.threshold.billing period alert projected': boolean
    'alertSettings.billAmount.threshold.billing period': number | null
    'alertSettings.waterUse.threshold.billing period alert over': boolean
    'alertSettings.waterUse.threshold.billing period alert projected': boolean
    'alertSettings.waterUse.threshold.billing period': number | null
    'alertSettings.electricUse.threshold.billing period alert over': boolean
    'alertSettings.electricUse.threshold.billing period alert projected': boolean
    'alertSettings.electricUse.threshold.billing period': number | null
    'alertSettings.naturalgasUse.threshold.billing period alert over': boolean
    'alertSettings.naturalgasUse.threshold.billing period alert projected': boolean
    'alertSettings.naturalgasUse.threshold.billing period': number | null
    'alertSettings.alertSettingsTag': string
}

interface ThresholdAlertSettingsConfig {
    account: {
        billAmount: {
            threshold: {
                'billing period alert over': boolean
                'billing period alert projected': boolean
                'billing period': number | null
            }
        };
        waterUse: {
            threshold: {
                'billing period alert over': boolean
                'billing period alert projected': boolean
                'billing period': number | null
            }
        };
        electricUse: {
            threshold: {
                'billing period alert over': boolean
                'billing period alert projected': boolean
                'billing period': number | null
            }
        };
        naturalgasUse: {
            threshold: {
                'billing period alert over': boolean
                'billing period alert projected': boolean
                'billing period': number | null
            }
        };
        alertSettingsTag: string | null;
    };
    meter: {
        waterUse: {
            threshold: {
                hour: number | null;
                day: number | null;
                week: number | null;
                month: number | null;
            };
            limit: number | null;
            sensitivity: unknown;
        };
        electricUse: {
            threshold: {
                hour: number | null;
                day: number | null;
                week: number | null;
                month: number | null;
            };
            limit: number | null;
            sensitivity: unknown;
        };
        naturalgasUse: {
            threshold: {
                hour: number | null;
                day: number | null;
                week: number | null;
                month: number | null;
            };
            limit: number | null;
            sensitivity: unknown;
        };
    };
    meterContinuous: {
        waterUse: {
            rate: number | null;
            hours: '4' | '8' | '16' | '24' | null;
        };
        electricUse: {
            rate: number | null;
            hours: '4' | '8' | '16' | '24' | null;
        };
        naturalgasUse: {
            rate: number | null;
            hours: '4' | '8' | '16' | '24' | null;
        };
    }
}

interface MeterThresholdAlertSettings {
    'alertSettings.waterUse.threshold.hour': number | null
    'alertSettings.waterUse.threshold.day': number | null
    'alertSettings.waterUse.threshold.week': number | null
    'alertSettings.waterUse.threshold.month': number | null
    'alertSettings.waterUse.limit.hour': number | null
    'alertSettings.waterUse.sensitivity': unknown
    'alertSettings.electricUse.threshold.hour': number | null
    'alertSettings.electricUse.threshold.day': number | null
    'alertSettings.electricUse.threshold.week': number | null
    'alertSettings.electricUse.threshold.month': number | null
    'alertSettings.electricUse.limit.hour': number | null
    'alertSettings.electricUse.sensitivity': unknown
    'alertSettings.naturalgasUse.threshold.hour': number | null
    'alertSettings.naturalgasUse.threshold.day': number | null
    'alertSettings.naturalgasUse.threshold.week': number | null
    'alertSettings.naturalgasUse.threshold.month': number | null
    'alertSettings.naturalgasUse.limit.hour': number | null
    'alertSettings.naturalgasUse.sensitivity': unknown
}

interface MeterContinuousThresholdAlertSettings {
    'alertSettings.waterUse.threshold.continuous.rate': number | null
    'alertSettings.waterUse.threshold.continuous.hours': '4' | '8' | '16' | '24' | null;
    'alertSettings.electricUse.threshold.continuous.rate': number | null
    'alertSettings.electricUse.threshold.continuous.hours': '4' | '8' | '16' | '24' | null;
    'alertSettings.naturalgasUse.threshold.continuous.rate': number | null
    'alertSettings.naturalgasUse.threshold.continuous.hours': '4' | '8' | '16' | '24' | null;
}

interface UpdateAlertSettingsResponse {
    accountResponse: GetAccountsResponse;
    meterResponse?: GetMetersResponse;
    meterContinuousResponse?: GetMetersResponse;
}


type SortType = 'alertSeverityRank' | 'lastActiveTime' | 'updatedTime' | 'savedTime'

export {
    HawkAuthResponse,
    HawkAuthResponseBody,
    HawkConfig,
    TimeseriesMetrics,
    TimeseriesResponse,
    AlertTypes,
    AlertsResponse,
    AlertsNotesResponse,
    AlertSeveritiesResponse,
    SortType,
    GetMetersResponse,
    AccountThresholdAlertSettings,
    MeterThresholdAlertSettings,
    MeterContinuousThresholdAlertSettings,
    ThresholdAlertSettingsConfig,
    GetAccountsResponse,
    UpdateAlertSettingsResponse,
}