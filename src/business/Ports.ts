import { AuthenticationData } from '../models/User'

export interface IAuthenticator {
    generateToken(payload: AuthenticationData): string
    getTokenData(token: string): AuthenticationData
}

export interface IIdGenerator {
    generateId(): string
}
