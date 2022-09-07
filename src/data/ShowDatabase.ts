import { BaseDatabase } from './BaseDatabase'
import { show } from '../models/Show'
import { CustomError } from '../errors/CustomError'

export class ShowDatabase extends BaseDatabase {
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
}