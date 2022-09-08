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
    test('Error case: weekDay was not passed in the body', async () => {
        expect.assertions(3)
        
        try {
            const weekDay = DAY_TYPES.SEXTA
            const startTime = 10
            const endTime = 15
            const bandId = ""
            const token = "token"
        
            await showBusinessTest.registerShow({weekDay, startTime, endTime, bandId, token})
        } catch (error: any) {
            expect(error).toBeDefined()
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe('Fill in the title and preparate mode fields')
        }
           
    })
})