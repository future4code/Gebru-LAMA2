import { ShowRepository } from '../../../src/business/ShowRepository'
import { show } from '../../../src/models/Show'

export class ShowDatabaseMock implements ShowRepository {
    async insertShow(show: show): Promise<void> {
        console.log('Usuário criado')
    }
}