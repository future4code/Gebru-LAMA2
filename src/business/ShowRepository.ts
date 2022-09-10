import { DAY_TYPES, show, shows } from '../models/Show'

export interface ShowRepository {
    insertShow(show: show): Promise<void>
    selectShows(weekDay: DAY_TYPES): Promise<shows>
}