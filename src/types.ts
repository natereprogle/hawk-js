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

export interface HawkAuthResponseBody {
    success: boolean,
    message: string,
    activeUser: {
        '__v': number,
        '_id': string,
        attributes: {
            accountIdArray: string[]
        },
        emailAddress: string,
        enabled: boolean,
        firstLoginTime: string,
        lastLoginTime: string,
        name: {
            first: string,
            last: string,
        },
        setupTime: string,
        updatedTime: string,
        username: string,
        contactPreference: Record<string, boolean>,
        mailingAddress: {
            address: string,
            city: string,
            state: string,
            zip: string
        },
        cellPhone: {
            areaCode: string,
            prefix: string,
            suffix: string
        }
    } | null,
    errors: string[] | null
}

export interface HawkAuthResponse {
    sessionCookie: string,
    body: HawkAuthResponseBody
}

export interface HawkConfig {
    username: string,
    password: string,
    districtName: string,
    platform: 'utilityhawk' | 'aquahawk'
}

export interface TimeseriesMetrics {
    electricUse: boolean,
    electricUseReading: boolean,
    temperature: boolean,
    rainfall: boolean
}

export interface TimeseriesResults {
    success: boolean,
    message: string,
    total: number,
    timeseries: {
        interval: '1 day' | '1 hour' | '1 month',
        timezone: string,
        timestamp: string,
        startTime: string,
        endTime: string,
        msec: number,
        electricUseActual: {
            num: number,
            min: string,
            max: string,
            sum: string,
            sumSq: string,
            sumIx: string,
            sumPos: string,
            'killowatt hours': string
        },
        electricUse: {
            num: number,
            min: string,
            max: string,
            sum: string,
            sumSq: string,
            sumIx: string,
            sumPos: string,
            'killowatt hours': string
        },
        rainfall: {
            num: number,
            min: string,
            max: string,
            sum: string,
            sumSq: string,
            sumIx: string,
            inches: number,
            centimeters: number,
            millimeters: number
        },
        highTemp: {
            num: number,
            min: string,
            max: string,
            sum: string,
            sumSq: string,
            sumIx: string,
            sumPos: string,
            degree: number,
            fahrenheit: number,
            celsius: number
        },
        lowTemp: {
            num: number,
            min: string,
            max: string,
            sum: string,
            sumSq: string,
            sumIx: string,
            sumPos: string,
            degree: number,
            fahrenheit: number,
            celsius: number
        },
        avgTemp: {
            num: number,
            min: string,
            max: string,
            sum: string,
            sumSq: string,
            sumIx: string,
            sumPos: string,
            degree: number,
            fahrenheit: number,
            celsius: number
        }
    }[],
    firstTime: string,
    lastTime: string
}