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