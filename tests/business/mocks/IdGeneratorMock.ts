import { IIdGenerator } from '../../../src/business/Ports'

export class IdGenerateMock implements IIdGenerator {
    generateId = jest.fn(() => 'id')
    
}