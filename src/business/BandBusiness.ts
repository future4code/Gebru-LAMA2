import { CustomError, invalidBand,invalidAuthenticatorData, invalidToken,MissingFieldsToComplete } from "../errors/CustomError";
import { Band, BandInputDTO } from "../models/Band";
import { Authenticator } from "../services/Authorization";
import { IdGenerator } from "../services/IdGenerator";
import { BandRepository } from "./BandRepository";


export class BandBusiness {
    constructor(private bandDatabase: BandRepository) { }

    async createBandBusiness(input:BandInputDTO) {
        try {

            const { name, music_genre,responsible, token } = input

            if (!token) {
                throw new invalidToken()
            }

            if (!name || !music_genre) {
                throw new MissingFieldsToComplete()
            }

            const authenticatorData = new Authenticator().getTokenData(token)

            if (!authenticatorData.id) {
                throw new invalidAuthenticatorData()
            }

            const id = new IdGenerator().generateId()
           
            const band: Band = {
                id,
                name,
                music_genre,
               responsible
               
            }

            await this.bandDatabase.createBand(band)


        } catch (error: any) {
            throw new CustomError(error.statusCode, error.sqlMessage || error.message);
        }
    }

    async bandByIdBusiness(id: string, token: string) {
        try {

            if (!token) {
                throw new invalidToken()
            }

            const authenticatorData = new Authenticator().getTokenData(token)

            if (!authenticatorData.id) {
                throw new invalidAuthenticatorData()
            }

            const band = await this.bandDatabase.selectBandById(id)

            if (!band) {
                throw new invalidBand()
            }

            return band

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.sqlMessage || error.message);
        }
    }
}