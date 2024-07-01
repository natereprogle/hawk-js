// noinspection JSVoidFunctionReturnValueUsed

import { authInfo, badAuthInfo } from './testData'
import { AuthService } from '../../src/AuthService'
import { mock, when } from 'ts-mockito'

describe('AuthService', () => {
    test('authTokenIsValid', () => {
        const authServiceMock = mock(AuthService)

        // Mock the behavior of setAuthInfo method on authServiceMock
        when(authServiceMock.setAuthInfo(authInfo)).thenReturn(undefined)
        when(authServiceMock.setAuthInfo(badAuthInfo)).thenReturn(undefined)

        // Create a new instance of AuthService and set the authInfo
        const authService = new AuthService()
        authService.setAuthInfo(authInfo)

        expect(authService.needsRefresh()).toBe(false)

        authService.setAuthInfo(badAuthInfo)
        expect(authService.needsRefresh()).toBe(true)
    })
})