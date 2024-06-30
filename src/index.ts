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

import RequestService from './RequestService'
import { HawkAuthResponse, HawkConfig, TimeseriesMetrics } from './types'

export class HawkClient {
    constructor(private requestService: RequestService) {
    }

    static create(config: HawkConfig) {
        const instance = axios.create({
            baseURL: 'https://' + config.districtName + '.' + config.platform + '.us',
            withCredentials: true,
        })
        const requestService = new RequestService(config, instance)

        return new HawkClient(requestService)
    }

    public getSessionInformation(): HawkAuthResponse {
        return this.requestService.getSessionInformation()
    }

    public async queryTimeseriesData(accountNumber: string,
        startTime: string,
        endTime: string,
        interval: '1 hour' | '1 day' | '1 month',
        extraStartTime: boolean,
        extraEndTime: boolean,
        metrics: TimeseriesMetrics) {
        return this.requestService.queryTimeseriesData(accountNumber, startTime, endTime, interval, extraStartTime, extraEndTime, metrics)
    }

    public async updateAccountAlertSettings() {

    }

    public async getAlertTypes() {

    }

    public async getAlerts() {

    }

    public async getAlertNotes() {
    }

    public async getAlertSeverities() {

    }

    public async getMeterByAccountID() {

    }

    public async getMeterByAccountNumber() {

    }

    public async updateMeterAlertSettings() {

    }

    public async updateMeterContinuousAlertSettings() {

    }
}