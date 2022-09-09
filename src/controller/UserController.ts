import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { Login,  SignupInputDTO, UserRole } from "../models/User";


export class UserController {
    constructor(private userBusiness: UserBusiness) {}
  
    async signupController(req: Request, res: Response) {
      try {
        const { name, email, password, role } = req.body;
  
        const signup: SignupInputDTO = {
          name,
          email,
          password,
          role
        };
  
        const token = await this.userBusiness.signupBusiness(signup);
  
        res.status(201).send({
          message: "Conta criada!",
          token,
        });
      } catch (error: any) {
        res.status(error.statusCode).send(error.message);
      }
    }
  
    async loginController(req: Request, res: Response) {
      try {
        const { email, password } = req.body;
  
        const login: Login = {
          email,
          password,
        };
  
        const token = await this.userBusiness.loginBusiness(login);
  
        res.status(200).send({ token });
      } catch (error: any) {
        res.status(error.statusCode).send(error.message);
      }
    }
  
    async findUserController(req: Request, res: Response) {
      try {
        const token = req.headers.authorization as string;
  
        const user = await this.userBusiness.findUserBusiness(token);
  
        res.status(200).send(user);
      } catch (error: any) {
        res.status(error.statusCode).send(error.message);
      }
    }
  
    async getUserByIdController(req: Request, res: Response) {
      try {
        const token = req.headers.authorization as string;
        const { id } = req.params;
  
        const user = await this.userBusiness.getUserByIdBusiness(id, token);
  
        res.status(200).send(user);
      } catch (error: any) {
        res.status(error.statusCode).send(error.message);
      }
    }
  }
  
/* export class UserController {
    private userBusiness: UserBusiness

    
    constructor(){
      this.userBusiness = new UserBusiness()
    }
  
        public signup = async (req: Request, res: Response) => {
          try {
            const input :UserInputDTO = {
              email: req.body.email, 
              password: req.body.password, 
              name: req.body.name, 
              role: req.body.role
            }
  
            const token = await this.userBusiness.createUser(input)
            
            res.status(201).send({ message: "Usuário criado!", token });
          } catch (error: any) {
            res.status(400).send(error.message);
          }
        };   
        
        public login = async (req: Request, res: Response) => {
          try {
            const input :LoginInputDTO = {
              email: req.body.email,
              password: req.body.password
            }
  
            const token = await this.userBusiness.login(input)
  
            res.status(200).send({message: "Login efetuado com sucesso!", token})
            
          } catch (error: any) {
            res.status(400).send(error.message);
            
          }
        } */
  
        /* public editUser = async (req: Request, res: Response) => {
          try {
            const token = req.headers.authorization as string
            const input :EditUserInputDTO = {
              name: req.body.name, 
              nickname: req.body.nickname,
              id: req.params.id
            }
            
            await this.userBusiness.editUser(input, token)
  
            res.status(200).send({message: "Usuário Alterado com sucesso" })
            
          } catch (error: any) {
            res.status(400).send(error.message);
          }
        } */
  
  
     