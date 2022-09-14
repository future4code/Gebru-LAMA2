import { BandRepository } from "../business/BandRepository"
import { CustomError } from "../errors/CustomError"
import { Band } from "../models/Band"
import { BaseDatabase } from "./BaseDatabase"

export class BandDatabase extends BaseDatabase implements BandRepository {

    private static TABLE_NAME = "lama_bands"

    async createBand(band: Band): Promise<void> {
        try {
            await BandDatabase.connection
                .insert({
                    id: band.id,
                    name: band.name,
                    music_genre: band.music_genre,
                    responsible: band.responsible,
                    
                })
                .into(BandDatabase.TABLE_NAME)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.sqlMessage || error.message)
        }
    }

    async selectBandById(id: string): Promise<Band> {
        try {
            const [band] = await BandDatabase.connection
                .select("id", "name", "music_genre", "responsible")
                .where({ id })
                .into(BandDatabase.TABLE_NAME)


            return band

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.sqlMessage || error.message)
        }
    }
}