import { ShowBusiness } from '../../src/business/ShowBusiness'
import { DAY_TYPES } from '../../src/models/Show'
import { AuthorizationMock } from './mocks/AuthorizationMock'
import { IdGeneratorMock } from './mocks/IdGeneratorMock'
import { ShowDatabaseMock } from './mocks/ShowDatabaseMock'


const showDatabaseMock = new ShowDatabaseMock()
const idGeneratorMock = new IdGeneratorMock()
const authorizationMock = new AuthorizationMock()

const showBusinessTest = new ShowBusiness(showDatabaseMock, authorizationMock, idGeneratorMock)

describe('Testing show registration in showBusiness', () => {
    test('Error case: endTime greater than 23', async () => {
        expect.assertions(2)
        
        try {
            const weekDay = DAY_TYPES.SEXTA
            const startTime = 10
            const endTime = 24
            const bandId = "12354"
            const token = "token"
        
            await showBusinessTest.registerShow({weekDay, startTime, endTime, bandId, token})
        } catch (error: any) {
            expect(error).toBeDefined()
            // expect(error.statusCode).toBe(401)
            expect(error.message).toBe('Invalid Time')
        }
    })
    
})