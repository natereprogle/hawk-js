// noinspection JSVoidFunctionReturnValueUsed

import { HawkClient } from '../../src/index'
import { alertConfig, authInfo, config } from './testData'
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


})