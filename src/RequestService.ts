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

import {
    AccountSettingsResponse,
    AccountUpdateConfig,
    AlertSeveritiesResponse,
    AlertsNotesResponse,
    AlertsResponse,
    AlertTypes,
    GetAccountsResponse,
    GetMetersResponse,
    HawkAuthResponse,
    HawkConfig,
    RequireAtLeastOne,
    SortType,
    ThresholdAlertSettingsConfig,
    TimeseriesMetrics,
    TimeseriesResponse,
    UpdateAlertSettingsResponse,
} from './types'
import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { AuthService } from './AuthService'
import { convertToFriendlyConfig, convertToUsableConfig } from './AlertHelper'

class RequestService {

    constructor(private _config: HawkConfig, private _instance: AxiosInstance, private _authService: AuthService) {
    }

    checkIfAuthNeeded(): boolean {
        return this._authService.needsRefresh()
    }

    getSessionInformation(): HawkAuthResponse {
        return this._authService.getAuthInfo()
    }

    async getAccounts(sort: SortType, secondarySort: SortType, dir: 'asc' | 'desc', secondaryDir: 'asc' | 'desc', page: number, start: number, limit: number): Promise<GetAccountsResponse> {
        if (this.checkIfAuthNeeded()) await this._authService.authenticate(this._config.username, this._config.password, this._instance)

        const response = await this._instance.get<GetAccountsResponse>('/accounts', {
            params: {
                '_dc': Date.now(),
                sort: sort,
                secondarySort: secondarySort,
                dir: dir,
                secondaryDir: secondaryDir,
                page: page,
                start: start,
                limit: limit,
            },
            headers: {
                'Cookie': this._authService.getAuthInfo().sessionCookie,
            },
        } as AxiosRequestConfig)

        return response.data
    }

    async getTimeseriesData(accountNumber: string, startTime: string, endTime: string, interval: '1 hour' | '1 day' | '1 month', extraStartTime: boolean, extraEndTime: boolean, metrics?: TimeseriesMetrics): Promise<TimeseriesResponse> {
        if (this.checkIfAuthNeeded()) await this._authService.authenticate(this._config.username, this._config.password, this._instance)

        const response = await this._instance.get<TimeseriesResponse>('/timeseries', {
            params: {
                '_dc': Date.now(),
                districtName: this._config.districtName,
                accountNumber: accountNumber,
                startTime: startTime,
                endTime: endTime,
                interval: interval,
                extraEndTime: extraEndTime,
                extraStartTime: extraStartTime,
                metrics: !metrics ? {
                    'electricUse': true,
                    'electricUseReading': true,
                    'temperature': true,
                    'rainfall': true,
                } : { ...metrics },
            },
            headers: {
                'Cookie': this._authService.getAuthInfo().sessionCookie,
            },
        } as AxiosRequestConfig)

        return response.data
    }

    async getAlertTypes(page: number, start: number, limit: number): Promise<AlertTypes> {
        if (this.checkIfAuthNeeded()) await this._authService.authenticate(this._config.username, this._config.password, this._instance)

        const response = await this._instance.get<AlertTypes>('/alerts/types', {
            params: {
                '_dc': Date.now(),
                page: page,
                start: start,
                limit: limit,
            },
            headers: {
                'Cookie': this._authService.getAuthInfo().sessionCookie,
            },
        } as AxiosRequestConfig)

        return response.data
    }

    async getAlerts(accountNumber: string, sort: SortType, dir: string, page: number, start: number, limit: number): Promise<AlertsResponse> {
        if (this.checkIfAuthNeeded()) await this._authService.authenticate(this._config.username, this._config.password, this._instance)

        const response = await this._instance.get<AlertsResponse>('/alerts', {
            params: {
                '_dc': Date.now(),
                districtName: this._config.districtName,
                accountNumber: accountNumber,
                sort: sort.valueOf(),
                dir: dir,
                page: page,
                start: start,
                limit: limit,
            },
            headers: {
                'Cookie': this._authService.getAuthInfo().sessionCookie,
            },
        } as AxiosRequestConfig)

        return response.data
    }

    async getAlertNotes(accountNumber: string, sort: SortType, dir: string, page: number, start: number, limit: number): Promise<AlertsNotesResponse> {
        if (this.checkIfAuthNeeded()) await this._authService.authenticate(this._config.username, this._config.password, this._instance)

        const response = await this._instance.get<AlertsNotesResponse>('/notes', {
            params: {
                '_dc': Date.now(),
                districtName: this._config.districtName,
                accountNumber: accountNumber,
                sort: sort.valueOf(),
                dir: dir,
                page: page,
                start: start,
                limit: limit,
            },
            headers: {
                'Cookie': this._authService.getAuthInfo().sessionCookie,
            },
        } as AxiosRequestConfig)

        return response.data
    }

    async getAlertSeverities(page: number, start: number, limit: number): Promise<AlertSeveritiesResponse> {
        if (this.checkIfAuthNeeded()) await this._authService.authenticate(this._config.username, this._config.password, this._instance)

        const response = await this._instance.get<AlertSeveritiesResponse>('/alerts/severities', {
            params: {
                '_dc': Date.now(),
                page: page,
                start: start,
                limit: limit,
            },
            headers: {
                'Cookie': this._authService.getAuthInfo().sessionCookie,
            },
        } as AxiosRequestConfig)

        return response.data
    }

    async getMeterByAccountID(accountId: string, sort: SortType, secondarySort: SortType, dir: 'asc' | 'desc', secondaryDir: 'asc' | 'desc', page: number, start: number, limit: number): Promise<GetMetersResponse> {
        if (this.checkIfAuthNeeded()) await this._authService.authenticate(this._config.username, this._config.password, this._instance)

        const response = await this._instance.get<GetMetersResponse>('/meters', {
            params: {
                '_dc': Date.now(),
                districtName: this._config.districtName,
                accountId: accountId,
                sort: sort.valueOf(),
                secondarySort: secondarySort.valueOf(),
                dir: dir,
                secondaryDir: secondaryDir,
                page: page,
                start: start,
                limit: limit,
            },
            headers: {
                'Cookie': this._authService.getAuthInfo().sessionCookie,
            },
        } as AxiosRequestConfig)

        return response.data
    }

    async getMeterByAccountNumber(accountNumber: string, sort: SortType, dir: 'asc' | 'desc', page: number, start: number, limit: number): Promise<GetMetersResponse> {
        if (this.checkIfAuthNeeded()) await this._authService.authenticate(this._config.username, this._config.password, this._instance)

        const response = await this._instance.get<GetMetersResponse>('/meters', {
            params: {
                '_dc': Date.now(),
                districtName: this._config.districtName,
                accountNumber: accountNumber,
                sort: sort.valueOf(),
                dir: dir,
                page: page,
                start: start,
                limit: limit,
            },
            headers: {
                'Cookie': this._authService.getAuthInfo().sessionCookie,
            },
        } as AxiosRequestConfig)

        return response.data
    }

    async getCurrentAlertSettings(accountId?: string): Promise<ThresholdAlertSettingsConfig> {
        if (this.checkIfAuthNeeded()) await this._authService.authenticate(this._config.username, this._config.password, this._instance)

        // If one wasn't provided we'll try to retrieve it from the accountIdArray in the AuthInfo body
        if (!accountId) {
            accountId = this._authService.getAuthInfo().body.activeUser?.attributes.accountIdArray[0]
        }

        if (accountId) {
            const meters = await this._instance.get<GetMetersResponse>('/meters', {
                params: {
                    '_dc': Date.now(),
                    districtName: this._config.districtName,
                    accountId: accountId,
                    sort: 'alertSeverityRank',
                    secondarySort: 'lastActiveTime',
                    dir: 'DESC',
                    secondaryDir: 'desc',
                    page: 1,
                    start: 0,
                    limit: 100,
                },
                headers: {
                    'Cookie': this._authService.getAuthInfo().sessionCookie,
                },
            } as AxiosRequestConfig)

            const accounts = await this._instance.get<GetAccountsResponse>('/accounts', {
                params: {
                    '_dc': Date.now(),
                    sort: 'alertSeverityRank',
                    secondarySort: 'lastActiveTime',
                    dir: 'DESC',
                    secondaryDir: 'desc',
                    districtName: this._config.districtName,
                    page: 1,
                    start: 0,
                    limit: 100,
                },
                headers: {
                    'Cookie': this._authService.getAuthInfo().sessionCookie,
                },
            } as AxiosRequestConfig)


            console.log(accounts.data)

            return convertToFriendlyConfig(accounts.data, meters.data)
        } else {
            throw new Error('Failed to get current alerting settings, an accountId could not be retrieved from previous auth requests nor was one wasn\'t provided')
        }
    }

    async updateAlertSettings(config: ThresholdAlertSettingsConfig, meterId?: string): Promise<UpdateAlertSettingsResponse> {
        if (this.checkIfAuthNeeded()) await this._authService.authenticate(this._config.username, this._config.password, this._instance)

        const {
            accountThresholdConfig,
            meterThresholdConfig,
            meterContinuousThresholdConfig,
        } = convertToUsableConfig(config)

        const accountId = this._authService.getAuthInfo().body.activeUser?.attributes.accountIdArray[0]

        if (!accountId) {
            throw new Error('Failed to get current account settings, an accountId could not be retrieved from previous auth requests')
        }

        const accountResponse: GetAccountsResponse = await this._instance.put(`/accounts/${accountId}`, {
            accountId: accountId,
        }, {
            params: {
                '_dc': Date.now(),
                setFields: accountThresholdConfig,
            },
        })

        if (meterId) {
            const meterResponse: GetMetersResponse = await this._instance.put(`/meters/${meterId}`, {
                meterId: meterId,
            }, {
                params: {
                    '_dc': Date.now(),
                    setFields: meterThresholdConfig,
                },
            })

            const meterContinuousResponse: GetMetersResponse = await this._instance.put(`/meters/${meterId}`, {
                meterId: meterId,
            }, {
                params: {
                    '_dc': Date.now(),
                    setFields: meterContinuousThresholdConfig,
                },
            })

            return { accountResponse, meterResponse, meterContinuousResponse }
        }

        return { accountResponse }
    }

    async refreshSession(): Promise<HawkAuthResponse> {
        return await this._authService.authenticate(this._config.username, this._config.password, this._instance)
    }

    async getUserProfileSettings(accountId?: string): Promise<AccountSettingsResponse> {
        if (this.checkIfAuthNeeded()) await this._authService.authenticate(this._config.username, this._config.password, this._instance)

        // If one wasn't provided we'll try to retrieve it from the accountIdArray in the AuthInfo body
        if (!accountId) {
            accountId = this._authService.getAuthInfo().body.activeUser?.attributes.accountIdArray[0]
        }

        if (accountId) {
            const response = await this._instance.get<AccountSettingsResponse>(`/users/${accountId}`, {
                params: {
                    '_dc': Date.now(),
                },
            })

            return response.data
        } else {
            throw new Error('Failed to get current account settings, an accountId could not be retrieved from previous auth requests nor was one wasn\'t provided')
        }
    }

    async changeUserProfileSettings(contactPreference: 'cellPhone' | 'homePhone' | 'email' | 'workPhone' | 'doNotContact' | 'text', updateInfo: RequireAtLeastOne<AccountUpdateConfig, 'cellPhone' | 'homePhone' | 'workPhone'>, accountId?: string): Promise<AccountSettingsResponse> {
        if (this.checkIfAuthNeeded()) await this._authService.authenticate(this._config.username, this._config.password, this._instance)

        // If one wasn't provided we'll try to retrieve it from the accountIdArray in the AuthInfo body
        if (!accountId) {
            accountId = this._authService.getAuthInfo().body.activeUser?.attributes.accountIdArray[0]
        }

        const data = await this.getUserProfileSettings(accountId);
        const updatedInfo = Object.assign({}, data.users, updateInfo)
        updatedInfo.contactPreference = { [contactPreference]: true }

        if (accountId) {
            const response = await this._instance.put<AccountSettingsResponse>(`/users/${accountId}`, updatedInfo, {
                params: {
                    '_dc': Date.now(),
                    'notify': 1
                },
            }).catch((error: unknown) => {
                throw new Error(`An error occurred while updating your account: ${error as string}`)
            })

            return response.data
        } else {
            throw new Error('Failed to get current account settings, an accountId could not be retrieved from previous auth requests nor was one wasn\'t provided')
        }
    }

    async registerAccounts() {
        if (this.checkIfAuthNeeded()) await this._authService.authenticate(this._config.username, this._config.password, this._instance)

        return Promise.resolve(undefined)
    }

    async exportDataToCsv() {
        if (this.checkIfAuthNeeded()) await this._authService.authenticate(this._config.username, this._config.password, this._instance)

        return Promise.resolve(undefined)
    }

    async getExportedData() {
        if (this.checkIfAuthNeeded()) await this._authService.authenticate(this._config.username, this._config.password, this._instance)

        return Promise.resolve(undefined)
    }

    async changePassword() {
        if (this.checkIfAuthNeeded()) await this._authService.authenticate(this._config.username, this._config.password, this._instance)

        return Promise.resolve(undefined)
    }

    async getReports() {
        if (this.checkIfAuthNeeded()) await this._authService.authenticate(this._config.username, this._config.password, this._instance)

        return Promise.resolve(undefined)
    }
}

export default RequestService