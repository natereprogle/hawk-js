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
import {
    AccountUpdateConfig,
    AddAccountRequest,
    AlertSeveritiesResponse,
    AlertsNotesResponse,
    AlertsResponse,
    AlertTypes,
    DataExportOptions,
    GetAccountsResponse,
    GetMetersResponse,
    HawkAuthResponse,
    HawkConfig,
    RemoveAccountRequest,
    RequireAtLeastOne,
    SortType,
    ThresholdAlertSettingsConfig,
    TimeseriesMetrics,
    TimeseriesResponse,
    UpdateAlertSettingsResponse,
} from './types'
import RequestService from './RequestService'
import axios from 'axios'
import { AuthService } from './AuthService'

/**
 * A class for interacting with the Utility/AquaHawk API
 * HawkClient will automatically and transparently authenticate in the background, so you never have to call authentication methods or check
 * if your session token is expired. However, if this is needed for whatever reason, methods are provided for that.
 *
 * At the current moment, while HawkJS should be able to support Water and Natural Gas, it hasn't been tested and some methods will not work.
 * If you have access to Water or Natural Gas through Utility/AquaHawk, please open an issue so we can work with you and add support.
 */
export class HawkClient {
    constructor(private _requestService: RequestService) {
    }

    /**
     * Create the HawkClient object
     * @param config {HawkConfig} The hawkconfig for your client, which includes necessary auth information to interact with your utility
     */
    static create(config: HawkConfig) {
        const instance = axios.create({
            baseURL: 'https://' + config.districtName + '.' + config.platform + '.us',
            withCredentials: true,
        })

        const authService = new AuthService()
        const requestService = new RequestService(config, instance, authService)

        return new HawkClient(requestService)
    }

    /**
     * Retrieves the current session information. This includes the session token and the auth body that is returned when signing in (Contains useful info!)
     * @throws {Error} An error is thrown if authentication hasn't happened yet
     */
    public getSessionInformation(): HawkAuthResponse {
        return this._requestService.getSessionInformation()
    }

    /**
     * This forces the client to request a session token. However, if the token is still valid it will not refresh.
     * This is more of a convenience method to use if you know the token is not valid or if the client hasn't made a request yet, which would
     * normally automatically authenticate.
     * @returns {Promise<HawkAuthResponse>} The new session information
     */
    public async forceSessionRefresh(): Promise<HawkAuthResponse> {
        if (this._requestService.checkIfAuthNeeded()) await this._requestService.refreshSession()
        return this.getSessionInformation()
    }

    /**
     * Get the token's expiration time in Epoch (milliseconds)
     * @returns {Promise<number>} The token's expiration time in Epoch (milliseconds)
     */
    public async getTokenExpirationTime(): Promise<number> {
        if (this._requestService.checkIfAuthNeeded()) await this._requestService.refreshSession()

        const cookieParts: string[] = this.getSessionInformation().sessionCookie.split(';')
        const dateString = cookieParts[2]?.split('=')[1]

        if (!dateString) {
            throw new Error('Failed to get token expiration time')
        }

        return Date.parse(dateString)
    }

    /**
     * Query timeseries data for your account, which includes usage data as well as weather information
     * @param accountNumber Your utility account number
     * @param startTime The start time of your query range. This is in ISO 8601 with Timezone Offset (2024-06-30T23:59:59-07:00)
     * @param endTime The end time of your query range. This is in ISO 8601 with Timezone Offset (2024-06-30T23:59:59-07:00)
     * @param interval The interval of your query. This can be '1 hour', '1 day', or '1 month'
     * @param extraStartTime If true, the start time will be extended to the previous interval
     * @param extraEndTime If true, the end time will be extended to the next interval
     * @param metrics The metrics you want returned in your response. This can be any combination of 'electricUse',
     *      'electricUseReading', 'temperature', 'rainfall'. At the current moment, this doesn't look like it does anything,
     *      so it can be safely left out as HawkJS will handle sending dummy data for you
     * @returns {Promise<TimeseriesResponse>} The timeseries data you've requested
     */
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
        }): Promise<TimeseriesResponse> {
        return this._requestService.getTimeseriesData(accountNumber, startTime, endTime, interval, extraStartTime, extraEndTime, metrics)
    }

    /**
     * Get all utility accounts on your Utility/AquaHawk account
     * @param sort Primary sort method. Defaults to 'alertSeverityRank'
     * @param secondarySort Secondary sort method. Defaults to 'lastActiveTime'
     * @param dir Primary sort direction. Defaults to 'desc'
     * @param secondaryDir Secondary sort direction. Defaults to 'desc'
     * @param page Page number. Defaults to 1
     * @param start Start index. Defaults to 0
     * @param limit Limit. Defaults to 100
     * @returns {Promise<GetAccountsResponse>}
     */
    public async getAccounts(sort: SortType = 'alertSeverityRank', secondarySort: SortType = 'lastActiveTime', dir: 'asc' | 'desc' = 'desc', secondaryDir: 'asc' | 'desc' = 'desc', page = 1, start = 0, limit = 100): Promise<GetAccountsResponse> {
        return this._requestService.getAccounts(sort, secondarySort, dir, secondaryDir, page, start, limit)
    }

    /**
     * Get all possible alert types Utility/AquaHawk may send you. This is not to be confused with active alerts
     * @param page Page number. Defaults to 1
     * @param start Start index. Defaults to 0
     * @param limit Limit. Defaults to 25
     * @returns {Promise<AlertTypes>}
     */
    public async getAlertTypes(page = 1, start = 0, limit = 25): Promise<AlertTypes> {
        return this._requestService.getAlertTypes(page, start, limit)
    }

    /**
     * Get active and historical alerts on your account. This includes notes.
     * @param accountNumber Your utility account number
     * @param sort Primary sort method. Defaults to 'updatedTime'
     * @param dir Primary sort direction. Defaults to 'desc'
     * @param page Page number. Defaults to 1
     * @param start Start index. Defaults to 0
     * @param limit Limit. Defaults to 100
     * @returns {Promise<AlertsResponse>}
     */
    public async getAlerts(accountNumber: string, sort: SortType = 'updatedTime', dir: 'asc' | 'desc' = 'desc', page = 1, start = 0, limit = 100): Promise<AlertsResponse> {
        return this._requestService.getAlerts(accountNumber, sort, dir, page, start, limit)
    }

    /**
     * Get all notes for active and historical alerts on your account. Doesn't include the alerting information, just the notes from said alerts. See {@link getAlerts} to pull that information
     * @param accountNumber Your utility account number
     * @param sort Primary sort method. Defaults to 'savedTime'
     * @param dir Primary sort direction. Defaults to 'desc'
     * @param page Page number. Defaults to 1
     * @param start Start index. Defaults to 0
     * @param limit Limit. Defaults to 100
     * @returns {Promise<AlertsNotesResponse>}
     */
    public async getAlertNotes(accountNumber: string, sort: SortType = 'savedTime', dir: 'asc' | 'desc' = 'desc', page = 1, start = 0, limit = 100): Promise<AlertsNotesResponse> {
        return this._requestService.getAlertNotes(accountNumber, sort, dir, page, start, limit)
    }

    /**
     * Get all possible alert severities Utility/AquaHawk may assign to alerts. This is not to be confused with active alert severities.
     * @param page Page number. Defaults to 1
     * @param start Start index. Defaults to 0
     * @param limit Limit. Defaults to 25
     * @returns {Promise<AlertSeveritiesResponse>}
     */
    public async getAlertSeverities(page = 1, start = 0, limit = 25): Promise<AlertSeveritiesResponse> {
        return this._requestService.getAlertSeverities(page, start, limit)
    }

    /**
     * Get all meters on a utility account based on your account ID. Basically this returns every single meter you have access to in Utility/AquaHawk
     * @param accountId Your Utility/AquaHawk account ID (Found in your Auth body, see {@link getSessionInformation}
     * @param sort Primary sort method. Defaults to 'lastActiveTime'
     * @param secondarySort Secondary sort method. Defaults to 'alertSeverityRank'
     * @param dir Primary sort direction. Defaults to 'desc'
     * @param secondaryDir Secondary sort direction. Defaults to 'desc'
     * @param page Page number. Defaults to 1
     * @param start Start index. Defaults to 0
     * @param limit Limit. Defaults to 100
     */
    public async getMeterByAccountID(accountId: string, sort: SortType = 'alertSeverityRank', secondarySort: SortType = 'lastActiveTime', dir: 'asc' | 'desc' = 'desc', secondaryDir: 'asc' | 'desc' = 'desc', page = 1, start = 0, limit = 100) {
        return this._requestService.getMeterByAccountID(accountId, sort, secondarySort, dir, secondaryDir, page, start, limit)
    }

    /**
     * Get all meters on a utility account based on account number. For example, your house at 123 Main St. may have account number 12345, and it has an electric and water meter. Use this to find those two meters
     * @param accountNumber Your utility account number
     * @param sort Primary sort method. Defaults to 'lastActiveTime'
     * @param dir Primary sort direction. Defaults to 'desc'
     * @param page Page number. Defaults to 1
     * @param start Start index. Defaults to 0
     * @param limit Limit. Defaults to 100
     * @returns {Promise<GetMetersResponse>}
     */
    public async getMeterByAccountNumber(accountNumber: string, sort: SortType = 'lastActiveTime', dir: 'asc' | 'desc' = 'desc', page = 1, start = 0, limit = 100): Promise<GetMetersResponse> {
        return this._requestService.getMeterByAccountNumber(accountNumber, sort, dir, page, start, limit)
    }

    /**
     * Get current account and meter alerting settings. See {@link updateAlertSettings} to update these settings
     * @param accountId An optional userId to pass in to specify which accountId you want to query alert settings for.
     *      If none is specified, hawk-js will default to the first one returned in the AuthBody
     * @returns {Promise<ThresholdAlertSettingsConfig>}
     */
    public async getCurrentAlertSettings(accountId?: string): Promise<ThresholdAlertSettingsConfig> {
        return this._requestService.getCurrentAlertSettings(accountId)
    }

    /**
     * Update account alerting settings. This is not as tested as the alerting settings configuration is not easily understood.
     * However, through testing with Postman this should work fine. Use at your own risk, nonetheless.
     * @param config {ThresholdAlertSettingsConfig} Your configuration for alerting. You can pull your existing one and modify it by using {@link getCurrentAlertSettings}
     * @param meterId The ID of the meter you want to update alerts for. This is an optional value, as meterId isn't required to update account settings.
     *     However, if you plan to update meter-specific alerting, you must provide this (See {@link getMeterByAccountNumber} or {@link getMeterByAccountID} for more information)
     * @returns {Promise<UpdateAlertSettingsResponse>}
     */
    public async updateAlertSettings(config: ThresholdAlertSettingsConfig, meterId?: string): Promise<UpdateAlertSettingsResponse> {
        return this._requestService.updateAlertSettings(config, meterId)
    }

    /**
     * Retrieve your account settings. If you have multiple account Ids, you may provide one to retrieve specifically those settings
     * @param accountId An optional accountId for the account you want to retrieve settings from
     */
    public async getUserProfileSettings(accountId?: string) {
        return this._requestService.getUserProfileSettings(accountId)
    }

    /**
     * Updates settings for your account. An optional accountId parameter is provided for you to specify which account to update if you have more than one
     * @param contactPreference The method of contact you'd like UtilityHawk/AquaHawk to use to reach you
     * @param updateInfo All the information you want updated on your account. You must provide at least one of workPhone, cellPhone, or homePhone, as UtilityHawk/AquaHawk requires at least one on your account
     * @param accountId An optional accountId to specify the account you want to update
     */
    public async changeUserProfileSettings(contactPreference: 'cellPhone' | 'homePhone' | 'email' | 'workPhone' | 'doNotContact' | 'text', updateInfo: RequireAtLeastOne<AccountUpdateConfig, 'cellPhone' | 'homePhone' | 'workPhone'>, accountId?: string) {
        return this._requestService.changeUserProfileSettings(contactPreference, updateInfo, accountId);
    }

    /**
     * Adds a utility account to your UtilityHawk/AquaHawk account.
     * This endpoint always returns 200 for some godforsaken reason, so be sure to check the success flag for success or failure
     * @param account The account information to register
     */
    public async registerAccounts(account: AddAccountRequest) {
        return this._requestService.registerAccounts(account)
    }

    /**
     * Removes a utility account from your UtilityHawk/AquaHawk account
     * @param account The account information you want to remove
     */
    public async removeAccount(account: RemoveAccountRequest) {
        return this._requestService.removeAccount(account)
    }

    /**
     * Requests an export of data for the specified time range and interval. Optionally provide an accountNumber to get just that data
     * The firstTime and lastTime strings within the DataExportOptions are simply ISO8601 UTC strings. You can craft these using the Date() object in JS
     * This method does not download the file, as the endpoint does not return file data, it just returns the file name of the data that was exported. You must call {@link getExportedData} after
     *      to retrieve your data
     *
     * @param exportSettings The settings you'd like to utilize for specifying the data exported
     */
    public async exportDataToCsv(exportSettings: DataExportOptions) {
        return this._requestService.exportDataToCsv(exportSettings)
    }

    /**
     * Saves a previous export to a file. You must have requested the export with {@link exportDataToCsv} prior
     *
     * @param username The username of the user to export data for, usually your email
     * @param type The type of file to export. As of right now, I believe the only acceptable type is "Reports"
     * @param filename The name of the file you want to save to. Leave the extension alone, it will append .csv to it automatically
     * @param fileSaveLocation The path of the location to save to. You should add a trailing slash to the directory, but you don't have to. hawk-js will attempt to add one for you if forgotten.
     *      This can also be omitted if you want to just download it to the process's current working directory, or if you're running in a browser (The browser will handle the download)
     * @param display If you simply want the data in text form, set this to true. hawk-js will return you the raw text instead of downloading the file
     *
     * @returns A true or false value depending on whether the Download was successful
     */
    public async getExportedData(username: string, type: string, filename: string, fileSaveLocation?: string, display?: boolean) {
        return this._requestService.getExportedData(username, type, filename, fileSaveLocation, display)
    }

    /**
     * Changes your account password. This assumes you're already authenticated to UtilityHawk/AquaHawk, meaning you don't have to confirm your old password.
     * A second parameter, `confirmPassword`, is available if you want to ensure you're entering the same password twice (Say, for user input)
     *
     * This method will automatically update the password in the config for hawk-js. Be sure to provide the new password the next time you create a hawk-js client object.
     *
     * This endpoint *can* return a `412 Precondition Failed`, but since hawk-js handles checks internally you will never receive that error. You only have to worry about error handling if
     * you provide the `confirmPassword` parameter, and it's not the same as `newPassword`
     *
     * @param newPassword The new password to set on your account
     * @param confirmPassword An optional parameter that allows you to provide your password a second time to guarantee they're the same, and you didn't accidentally make a typo during input
     * @throws Error Thrown when `confirmPassword` is provided but does not match `newPassword`
     */
    public async changePassword(newPassword: string, confirmPassword?: string) {
        return this._requestService.changePassword(newPassword, confirmPassword)
    }

    /**
     * Gets a list of all previous reports that were exported. This endpoint does not export any files, you will need to call {@link getExportedData} to actually retrieve them
     *
     * @param page The optional page if more than `limit` values were returned, defaults to 1
     * @param start The optional start value, defaults to 0
     * @param limit The optional limit value, defaults to 25
     */
    public async getReports(page?: number, start?: number, limit?: number) {
        return this._requestService.getReports(page, start, limit)
    }
}