import express from 'express'
import { ShowBusiness } from '../business/ShowBusiness'
import { ShowController } from '../controller/ShowController'
import { ShowDatabase } from '../data/ShowDatabase'
import { Authenticator } from '../services/Authorization'
import { IdGenerator } from '../services/IdGenerator'

export const showRouter = express.Router()

const authorization = new Authenticator()
const idGenerator = new IdGenerator()

const showDatabase = new ShowDatabase()
const showBusiness = new ShowBusiness(showDatabase, authorization, idGenerator)
const showController = new ShowController(showBusiness)

showRouter.post('/register', (req, res) => showController.registerShow(req, res))
showRouter.get('/shows', (req, res) => showController.getShows(req, res))