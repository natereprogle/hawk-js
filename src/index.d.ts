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
    AlertSeveritiesResponse,
    AlertsNotesResponse,
    AlertsResponse,
    AlertTypes,
    GetAccountsResponse,
    GetMetersResponse,
    HawkAuthResponse,
    HawkConfig,
    SortType,
    ThresholdAlertSettingsConfig,
    TimeseriesMetrics,
    TimeseriesResponse,
    UpdateAlertSettingsResponse,
} from './types'

export type * from './types'

export declare class HawkClient {
    static create(config: HawkConfig);

    getSessionInformation(): Promise<HawkAuthResponse>;

    forceSessionRefresh(): Promise<HawkAuthResponse>;

    getTokenExpirationTime(): Promise<number>;

    queryTimeseriesData(accountNumber: string,
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
                        }): Promise<TimeseriesResponse>;

    getAccounts(sort: SortType = 'alertSeverityRank', secondarySort: SortType = 'lastActiveTime', dir: 'asc' | 'desc' = 'desc', secondaryDir: 'asc' | 'desc' = 'desc', page = 1, start = 0, limit = 100): Promise<GetAccountsResponse>;

    getAlertTypes(page = 1, start = 0, limit = 25): Promise<AlertTypes>

    getAlerts(accountNumber: string, sort: SortType = 'updatedTime', dir: 'asc' | 'desc' = 'desc', page = 1, start = 0, limit = 100): Promise<AlertsResponse>

    getAlertNotes(accountNumber: string, sort: SortType = 'savedTime', dir: 'asc' | 'desc' = 'desc', page = 1, start = 0, limit = 100): Promise<AlertsNotesResponse>

    getAlertSeverities(page = 1, start = 0, limit = 25): Promise<AlertSeveritiesResponse>

    getMeterByAccountID(accountId: string, sort: SortType = 'alertSeverityRank', secondarySort: SortType = 'lastActiveTime', dir: 'asc' | 'desc' = 'desc', secondaryDir: 'asc' | 'desc' = 'desc', page = 1, start = 0, limit = 100): Promise<GetMetersResponse>

    getMeterByAccountNumber(accountNumber: string, sort: SortType = 'lastActiveTime', dir: 'asc' | 'desc', page: number, start: number, limit: number): Promise<GetMetersResponse>

    getCurrentAlertSettings(): Promise<ThresholdAlertSettingsConfig>

    updateAlertSettings(config: ThresholdAlertSettingsConfig, meterId?: string): Promise<UpdateAlertSettingsResponse>
}