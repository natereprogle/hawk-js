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

import { AxiosInstance } from 'axios'
import { HawkAuthResponse, HawkAuthResponseBody } from './types'

export class AuthService {
    private authInfo?: HawkAuthResponse

    /**
     * Authenticates against the UtilityHawk API and stores the session cookie automatically. This cookie will be transparently refreshed if needed
     * @param username Your UtilityHawk/AquaHawk username (Typically your email)
     * @param password Your UtilityHawk/AquaHawk password
     * @param {AxiosInstance} client The AxiosInstance of the API. This is created by the HawkClient
     * @throws {Error} Throws an error if authentication wasn't successful. This is done as a convenience by the library
     *      because the API will always return a 200 OK no matter what
     */
    async authenticate(username: string, password: string, client: AxiosInstance): Promise<HawkAuthResponse> {
        const params = new URLSearchParams()
        params.append('username', username)
        params.append('password', password)

        const response = await client.post('/login', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })

        const sessionCookie = response.headers['set-cookie']?.[0]
        const responseData = response.data as HawkAuthResponseBody

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.authInfo = { sessionCookie: sessionCookie!, body: responseData }
        // The request will always have a success field to mark if the request was successful or not, since the API is dumb and returns 200 OK no matter what


        return new Promise<HawkAuthResponse>((resolve, reject) => {
            if (responseData.success && this.authInfo) {
                resolve(this.authInfo)
            } else {
                reject(new Error(JSON.stringify(response.data)))
            }
        })
    }

    /**
     *
     */
    needsRefresh(): boolean {
        if (typeof this.authInfo === 'undefined') {
            return true
        }

        const cookieParts: string[] = this.authInfo.sessionCookie.split(';')
        const dateString = cookieParts[2]?.split('=')[1]
        if (dateString) {
            const dateObject = Date.parse(dateString)
            const today = Date.now()
            return dateObject < today
        }

        return true
    }

    getAuthInfo(): HawkAuthResponse {
        if (!this.authInfo) {
            throw new Error('No auth info available, have you authenticated?')
        }

        return this.authInfo
    }

    setAuthInfo(newAuthInfo: HawkAuthResponse): void {
        this.authInfo = newAuthInfo
    }
}