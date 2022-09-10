import { CustomError, InvalidDay, InvalidTime, Unauthorized } from '../errors/CustomError'
import { GetShowsDTO, RegisterShowDTO, show, shows } from '../models/Show'
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

        if (!startTime || !endTime || !bandId || !token) {
            throw new CustomError(400, 'Fill in the title and preparate mode fields')
        }

        if (weekDay !== "SEXTA" && weekDay !== "SÁBADO" && weekDay !== "DOMINGO") {
            throw new InvalidDay()
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

    getShows = async (input: GetShowsDTO): Promise<shows> => {
        const weekDay = input

        const shows = await this.showDatabase.selectShows(weekDay.weekDay)

        return shows
    }
}