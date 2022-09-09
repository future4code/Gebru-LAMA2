import express from "express";
import { UserBusiness } from "../business/UserBusiness";

import { UserController } from "../controller/UserController";
import { UserDatabase } from "../data/UserDatabase";

export const userRouter = express.Router()


const userDataBase = new UserDatabase()
const userBusiness = new UserBusiness(userDataBase)
const userController = new UserController(userBusiness)

userRouter.post("/signup", (req, res) => userController.signupController(req, res))
userRouter.post("/login", (req, res) => userController.loginController(req, res))
userRouter.get("/user", (req, res) => userController.findUserController(req, res))
userRouter.get("/user/:id", (req, res) => userController.getUserByIdController(req, res))

/* const userController = new UserController()

userRouter.post('/signup', userController.signup)
userRouter.post('/login', userController.login)
 */