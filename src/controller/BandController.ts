import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { CustomError, invalidBand } from "../errors/CustomError";
import { BandInputDTO } from "../models/Band";

export class BandController {
    constructor(private bandBusiness: BandBusiness) { }

    async createBandController(req: Request, res: Response) {
        try {

            const token = req.headers.authorization as string
            const { name, music_genre,responsible } = req.body

            const band: BandInputDTO = {
                name,
                music_genre,
                responsible,
                token
            }

             await this.bandBusiness.createBandBusiness(band);
           

            res.status(201).send({ message: "Banda criada com sucesso!" })

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.sqlMessage || error.message);
        }
    }
      
    


    async bandByIdController(req: Request, res: Response) {
        try {

            const token = req.headers.authorization as string
            const { id } = req.params

            const band = await this.bandBusiness.bandByIdBusiness(id, token)

            if(!band) {
                throw new invalidBand();
            }

            res.status(200).send(band)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.sqlMessage || error.message);
        }
    }
} 