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

import axios from 'axios'
import { auth } from './auth'

export class HawkClient {
    private response: HawkAuthResponse

    private instance = (baseUrl: string, platform: 'utilityhawk' | 'aquahawk', authCookie: string) => axios.create({
        baseURL: 'https://' + baseUrl + '.' + platform + '.us',
    })

    constructor(username: string, password: string, districtName: string, platform: 'utilityhawk' | 'aquahawk') {
        response = await auth(username, password)
        instance(districtName, platform, authCookie)
    }
}