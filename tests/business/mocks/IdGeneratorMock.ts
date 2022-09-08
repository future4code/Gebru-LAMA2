import { IIdGenerator } from '../../../src/business/Ports'

export class IdGeneratorMock implements IIdGenerator {
    generateId = jest.fn(() => 'id')
    
}