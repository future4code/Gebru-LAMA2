import { show } from '../models/Show'

export interface ShowRepository {

    insertShow(show: show): Promise<void>

}