import { CustomError, InvalidTime, Unauthorized } from '../errors/CustomError'
import { RegisterShowDTO, show } from '../models/Show'
import { IAuthenticator, IIdGenerator } from './Ports'
import { ShowRepository } from './ShowRepository'

export class ShowBusiness {
    constructor(
        private showDatabase: ShowRepository,
        private authorization: IAuthenticator,
        private idGenerator: IIdGenerator
    ) {}

    registerShow = async (input: RegisterShowDTO): Promise<void> => {
        const { weekDay, startTime, endTime, bandId, token } = input

        if (!weekDay || !startTime || !endTime || !bandId || !token) {
            throw new CustomError(400, 'Fill in the title and preparate mode fields')
        }

        if (startTime < 8 || endTime > 23) {
            throw new InvalidTime()
        }

        const data = this.authorization.getTokenData(token)

        if (!data.id) {
            throw new Unauthorized()
        }

        const id: string = this.idGenerator.generateId()

        const show: show = {
            id,
            weekDay,
            startTime,
            endTime,
            bandId
        }

        await this.showDatabase.insertShow(show)
    }
}