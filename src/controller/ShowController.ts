import { Request, Response } from 'express'
import { ShowBusiness } from '../business/ShowBusiness'
import { RegisterShowDTO } from '../models/Show'

export class ShowController {
    private showBusiness: ShowBusiness
    
    constructor() {
        this.showBusiness = new ShowBusiness()
    }

    registerShow = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: RegisterShowDTO = {
                weekDay: req.body.weekDay,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                bandId: req.params.bandId,
                token: req.headers.authorization!
            }
            
            await this.showBusiness.registerShow(input)

            res.status(201).send({message: 'Show registered successfully'})

        } catch (error: any) {
            res.status(400).send(error.message)
        }
    }
}