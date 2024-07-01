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

// This is because TypeScript can't import types normally if the .d.ts file is named the same as the file you're importing to
// This causes a warning when removed that the import can be shorter but, if it is shorter, then it will throw a warning due to circular references
// noinspection ES6PreferShortImport
import { HawkAuthResponse, HawkConfig, SortType, ThresholdAlertSettingsConfig, TimeseriesMetrics } from './types'
import RequestService from './RequestService'
import axios from 'axios'
import { AuthService } from './AuthService'

export class HawkClient {
    constructor(private requestService: RequestService) {
    }

    static create(config: HawkConfig) {
        const instance = axios.create({
            baseURL: 'https://' + config.districtName + '.' + config.platform + '.us',
            withCredentials: true,
        })

        const authService = new AuthService()
        const requestService = new RequestService(config, instance, authService)

        return new HawkClient(requestService)
    }

    public getSessionInformation(): HawkAuthResponse {
        return this.requestService.getSessionInformation()
    }

    /**
     * This forces the client to request a session token. However, if the token is still valid it will not refresh.
     * This is more of a convenience method to use if you know the token is not valid or if the client hasn't made a request yet, which would
     * normally automatically authenticate.
     */
    public async forceSessionRefresh(): Promise<HawkAuthResponse> {
        if (this.requestService.checkIfAuthNeeded()) await this.requestService.refreshSession()
        return this.getSessionInformation()
    }

    /**
     * Get the token's expiration time in Epoch (milliseconds)
     */
    public async getTokenExpirationTime(): Promise<number> {
        if (this.requestService.checkIfAuthNeeded()) await this.requestService.refreshSession()

        const cookieParts: string[] = this.getSessionInformation().sessionCookie.split(';')
        const dateString = cookieParts[2]?.split('=')[1]

        if (!dateString) {
            throw new Error('Failed to get token expiration time')
        }

        return Date.parse(dateString)
    }

    public async queryTimeseriesData(accountNumber: string,
        startTime: string,
        endTime: string,
        interval: '1 hour' | '1 day' | '1 month',
        extraStartTime: boolean,
        extraEndTime: boolean,
        metrics: TimeseriesMetrics = {
            electricUse: true,
            electricUseReading: true,
            temperature: true,
            rainfall: true,
        }) {
        return this.requestService.getTimeseriesData(accountNumber, startTime, endTime, interval, extraStartTime, extraEndTime, metrics)
    }

    public async getAccounts(sort: SortType = 'alertSeverityRank', secondarySort: SortType = 'lastActiveTime', dir: 'asc' | 'desc' = 'desc', secondaryDir: 'asc' | 'desc' = 'desc', page = 1, start = 0, limit = 100) {
        return this.requestService.getAccounts(sort, secondarySort, dir, secondaryDir, page, start, limit)
    }

    public async getAlertTypes(page = 1, start = 0, limit = 25) {
        return this.requestService.getAlertTypes(page, start, limit)
    }

    public async getAlerts(accountNumber: string, sort: SortType = 'updatedTime', dir: 'asc' | 'desc' = 'desc', page = 1, start = 0, limit = 100) {
        return this.requestService.getAlerts(accountNumber, sort, dir, page, start, limit)
    }

    public async getAlertNotes(accountNumber: string, sort: SortType = 'savedTime', dir: 'asc' | 'desc' = 'desc', page = 1, start = 0, limit = 100) {
        return this.requestService.getAlertNotes(accountNumber, sort, dir, page, start, limit)
    }

    public async getAlertSeverities(page = 1, start = 0, limit = 25) {
        return this.requestService.getAlertSeverities(page, start, limit)
    }

    public async getMeterByAccountID(accountId: string, sort: SortType = 'alertSeverityRank', secondarySort: SortType = 'lastActiveTime', dir: 'asc' | 'desc' = 'desc', secondaryDir: 'asc' | 'desc' = 'desc', page = 1, start = 0, limit = 100) {
        return this.requestService.getMeterByAccountID(accountId, sort, secondarySort, dir, secondaryDir, page, start, limit)
    }

    public async getMeterByAccountNumber(accountNumber: string, sort: SortType = 'lastActiveTime', dir: 'asc' | 'desc', page: number, start: number, limit: number) {
        return this.requestService.getMeterByAccountNumber(accountNumber, sort, dir, page, start, limit)
    }

    public async getCurrentAlertSettings() {
        return this.requestService.getCurrentAlertSettings()
    }

    public async updateAlertSettings(config: ThresholdAlertSettingsConfig, meterId?: string) {
        return this.requestService.updateAlertSettings(config, meterId)
    }
}