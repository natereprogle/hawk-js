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

type HawkAuthResponseBody = {
    success: boolean,
    message: string,
    activeUser: {
        "__v": number,
        "_id": string,
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
        contactPreference: {
            [key: string]: boolean
        },
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
    }
}

type HawkAuthResponse = {
    sessionCookie: string,
    body: HawkAuthResponseBody
}