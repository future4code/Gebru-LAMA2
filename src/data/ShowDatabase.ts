import { BaseDatabase } from './BaseDatabase'
import { DAY_TYPES, show, shows } from '../models/Show'
import { CustomError } from '../errors/CustomError'
import { ShowRepository } from '../business/ShowRepository'

export class ShowDatabase extends BaseDatabase implements ShowRepository {
    private static table_name = 'lama_shows'

    insertShow = async (show: show): Promise<void> => {
        try {
            await ShowDatabase
            .connection(ShowDatabase.table_name)
            .insert({
                id: show.id,
                week_day: show.weekDay,
                start_time: show.startTime,
                end_time: show.endTime,
                band_id: show.bandId
            })
            
        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage)
        }
    }

    selectShows = async (weekDay: DAY_TYPES): Promise<shows> => {
        try {
            const result = await ShowDatabase
            .connection(ShowDatabase.table_name)
            .select()
            .where('week_day', weekDay)

            return result[0]
            
        } catch (error: any) {
            throw new CustomError(400, error.sqlMessage)
        }
    }
}