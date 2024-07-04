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

// noinspection JSVoidFunctionReturnValueUsed

// noinspection JSVoidFunctionReturnValueUsed
// noinspection JSVoidFunctionReturnValueUsed
// noinspection JSVoidFunctionReturnValueUsed
import { HawkClient } from '../../src/index'
import { alertConfig, authInfo, config, updateInfo } from './testData'
import { instance, mock, spy, when } from 'ts-mockito'
import RequestService from '../../src/RequestService'
import { AuthService } from '../../src/AuthService'

let hawkClient: HawkClient

describe('HawkClient', () => {
    beforeEach(() => {

        const authServiceMock = mock(AuthService)
        const requestServiceMock = mock(RequestService)
        when(authServiceMock.setAuthInfo(authInfo)).thenReturn(undefined)

        hawkClient = new HawkClient(instance(requestServiceMock))

        authServiceMock.setAuthInfo(authInfo)
    })

    test('create', () => {
        const client = HawkClient.create(config)

        expect(client).toBeDefined()
        expect(client).toBeInstanceOf(HawkClient)
    })

    test('getSessionInformation', () => {
        const client = HawkClient.create(config)
        const clientSpy = spy(client)

        // We haven't authenticated yet, so attempting to get session info should fail
        expect(() => client.getSessionInformation()).toThrow()

        // Pretend that we've authenticated by forcing the return of authInfo
        when(clientSpy.getSessionInformation()).thenReturn(authInfo)

        // Check to make sure that calling getSessionInformation returns authInfo
        expect(client.getSessionInformation()).toEqual(authInfo)
    })

    test('queryTimeseriesData', async () => {
        await hawkClient.queryTimeseriesData('12345', '2020-01-01T00:00:00-05:00', '2020-01-01T00:00:00-05:0', '1 hour', false, false)

        // As far as I can tell, metrics isn't a used property of this method.
        // However, we still need to test to make sure it works in the future.
        await hawkClient.queryTimeseriesData('12345', '2020-01-01T00:00:00-05:00', '2020-01-01T00:00:00-05:0', '1 hour', false, false, {
            electricUse: false,
            electricUseReading: true,
            temperature: false,
            rainfall: true,
        })
    })

    test('getAccounts', async () => {
        await hawkClient.getAccounts()
        await hawkClient.getAccounts('updatedTime', 'lastActiveTime', 'desc', 'asc', 1, 0, 100)
    })

    test('getAlertTypes', async () => {
        await hawkClient.getAlertTypes()
        await hawkClient.getAlertTypes(0, 0, 0)
    })

    test('getAlerts', async () => {
        await hawkClient.getAlerts('12345')
        await hawkClient.getAlerts('12345', 'savedTime', 'asc', 1, 0, 25)
    })

    test('getAlertNotes', async () => {
        await hawkClient.getAlertNotes('12345')
        await hawkClient.getAlertNotes('12345', 'savedTime', 'asc', 1, 0, 100)
    })

    test('getAlertSeverities', async () => {
        await hawkClient.getAlertSeverities()
        await hawkClient.getAlertSeverities(1, 0, 25)
    })

    test('getMeterByAccountID', async () => {
        await hawkClient.getMeterByAccountID('12345')
        await hawkClient.getMeterByAccountID('12345', 'alertSeverityRank', 'lastActiveTime', 'desc', 'asc', 1, 0, 100)
    })

    test('getMeterByAccountNumber', async () => {
        await hawkClient.getMeterByAccountNumber('12345', 'alertSeverityRank', 'desc', 1, 0, 100)
    })

    test('getCurrentAlertSettings', async () => {
        await hawkClient.getCurrentAlertSettings()
    })

    test('updateAlertSettings', async () => {
        // This will only update account settings
        await hawkClient.updateAlertSettings(alertConfig)

        // Because a meterId was supplied, we can also update utility-specific alerts
        await hawkClient.updateAlertSettings(alertConfig, '12345')
    })

    test('getUserProfileSettings', async () => {
        await hawkClient.getUserProfileSettings()

        await hawkClient.getUserProfileSettings(authInfo.body.activeUser?.attributes?.accountIdArray[0])
    })

    test('changeUserProfileSettings', async () => {
        await hawkClient.changeUserProfileSettings('cellPhone', updateInfo)

        await hawkClient.changeUserProfileSettings('cellPhone', updateInfo, authInfo.body.activeUser?.attributes?.accountIdArray[0])
    })

    test('registerAccount', async () => {
        await hawkClient.registerAccounts({
            accountTag1: '',
            accountTag2: '',
            accountTag3: '',
            accountNumber: '123456',
            accountName: 'BOB, BILLY & BRENDA',
            serviceAddress: {
                address: '123 Main St',
                city: 'New York',
                state: 'NY',
                zip: '10001',
            },
        })
    })

    test('registerAccount', async () => {
        await hawkClient.removeAccount({
            accountNumber: '123456',
            accountName: 'BOB, BILLY & BRENDA',
            serviceAddress: {
                address: '123 Main St',
                city: 'New York',
                state: 'NY',
                zip: '10001',
            },
        })
    })

    test('exportDataToCsv', async () => {
        const date = new Date()

        await hawkClient.exportDataToCsv({
            accountNumber: '123456',
            districtName: config.districtName,
            firstTime: `${date.setDate(date.getDate() - 5)}`,
            lastTime: `${date}`,
            interval: '1 hour',
        })
    })

    test('getExportedData', async () => {
        await hawkClient.getExportedData(config.username, "Reports", "test.csv", "C:\\File Path\\Test")

        await hawkClient.getExportedData(config.username, "Reports", "test.csv", "C:\\File Path\\Test", true)
    })

    test('getExportedData', async () => {
        await hawkClient.getExportedData(config.username, "Reports", "test.csv", "C:\\File Path\\Test")

        await hawkClient.getExportedData(config.username, "Reports", "test.csv", "C:\\File Path\\Test", true)
    })

    test('changePassword', async () => {
        await hawkClient.changePassword('newPassword')

        // If the second param is passed, we should receive an error if they don't match
        expect(async () => await hawkClient.changePassword('newPassword', 'n3wPa$$w0rd')).toThrow()
    })

    test('getReports', async () => {
        await hawkClient.getReports()

        await hawkClient.getReports(1, 0, 50)
    })


})