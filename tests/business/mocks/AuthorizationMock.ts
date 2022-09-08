import { IAuthenticator } from '../../../src/business/Ports'
import { AuthenticationData } from '../../../src/models/User'

export class AuthorizationMock implements IAuthenticator {
    generateToken(payload: AuthenticationData): string {
        return 'token'
    }
    getTokenData(token: string): AuthenticationData {
        return {id: 'id'}
    }
}