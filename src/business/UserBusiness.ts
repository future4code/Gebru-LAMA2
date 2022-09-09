
import { CustomError, invalidAuthenticatorData, invalidEmail, InvalidEmail,  invalidPassword,  invalidPasswordCreate, invalidToken, invalidUser, invalidUserEmail, MissingFieldsToComplete, UnathorizedUser, UserNotFound } from "../errors/CustomError";
import { Login, Signup, SignupInputDTO, User} from "../models/User";

import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { UserRepository } from "./UserRepository";
import { Authenticator } from "../services/Authorization";

export class UserBusiness {
    constructor(private userDatabase: UserRepository) {}
  
    async signupBusiness(signup: SignupInputDTO) {
      try {
        let { name, email, password,role } = signup;
  
        if (!name || !email || !password || !role) {
          throw new MissingFieldsToComplete();
        }
  
        if (role !== "NORMAL" && role !== "ADMIN"){
          role = "NORMAL"
        } 

        if (!email.includes("@")) {
          throw new InvalidEmail();
        }
  
        if (password.length < 6) {
          throw new invalidPasswordCreate();
        }
  
        const findEmail = await this.userDatabase.findUserEmail(email);
  
        if (findEmail) {
          throw new invalidUserEmail();
        }
  
        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(password);
  
        const id = new IdGenerator().generateId();
        
  
        const newsignup: User = {
          id,
          name,
          email,
          password: hashPassword,
          role 
        };
  
        await this.userDatabase.signup(newsignup);
  
        const authenticator = new Authenticator();
        const acessToken = authenticator.generateToken({ id, role });
  
        return acessToken;
      } catch (error: any) {
          throw new CustomError(error.statusCode, error.sqlMessage || error.message);
      }
    }
  
    async loginBusiness(login: Login) {
      try {
        const { email, password } = login;
  
        if (!email || !password) {
          throw new MissingFieldsToComplete();
        }
  
        const user = this.userDatabase.findUserEmail(email);
  
        if (!user) {
          throw new invalidUser();
        }
  
        if (!email.includes("@")) {
          throw new invalidEmail();
        }
  
        
    
        const hashManager = new HashManager();
        const passwordIsCorrect = await hashManager.compare(
          password,(await user).password
        ); 
  
        const authenticator = new Authenticator();
        const token = authenticator.generateToken({ id: (await user).id, role: (await user).role });
  
        if (!passwordIsCorrect) {
          throw new invalidPassword();
        }
        return token;
      } catch (error: any) {
        throw new CustomError(error.statusCode, error.sqlMessage || error.message);
      }
    }
  
    async findUserBusiness(token: string) {
      try {
        if (!token) {
          throw new invalidToken();
        }
  
        const authenticatorData = new Authenticator().getTokenData(token);
  
        if (!authenticatorData.id) {
          throw new invalidAuthenticatorData();
        }
  
        const user = await this.userDatabase.selectByUser(authenticatorData.id);
  
  
        return user;
      } catch (error: any) {
        throw new CustomError(error.statusCode, error.sqlMessage || error.message);
      }
    }
  
    async getUserByIdBusiness(id: string, token: string) {
      try {
        if (!token) {
          throw new invalidToken();
        }
  
        const authenticatorData = new Authenticator().getTokenData(token);
  
        if (!authenticatorData.id) {
          throw new invalidAuthenticatorData();
        }
  
        const user = await this.userDatabase.selectUserById(id);
  
        return user;
      } catch (error: any) {
        throw new CustomError(error.statusCode, error.sqlMessage || error.message);
      }
    }

/* export class UserBusiness {
  private userDB: UserDatabase
  constructor(){
    this.userDB = new UserDatabase()
  }
  public createUser = async (input :UserInputDTO) => {
    let {name , email, password, role} = input 

    if (!name  || !email || !password || !role) {
      throw new CustomError(422, "Ausência de parâmetro") 
    }

    if (role !== "NORMAL" && role !== "ADMIN"){
      role = "NORMAL"
    }

    const id = IdGenerator.generateId()
    const hash = await HashManager.generateHash(password)

    const user :User = {
      id, 
      email, 
      password: hash, 
      name, 
      role: UserRole
    }

    await this.userDB.signup(user)
    const token = Authenticator.generateToken({id})

    return token
  }

  public login = async (input:LoginInputDTO) => {
    let {email, password} = input 

    if(!email || !password) {
      throw new CustomError(400, "Ausência de parâmetros")
    }

    const user = await this.userDB.findUserEmail(email)
    const hashCompare = await HashManager.compareHash(
      password, user.password
    )

    if(!hashCompare){ 
      throw new InvalidPassword()
    }

    const payload :AuthenticationData = {
      id: user.id, 
      role: user.role
    }

    const token = Authenticator.generateToken(payload)

    return token
  } */

 /*  public editUser = async (input:EditUserInputDTO, token: string) => {
    let {name , nickname, id} = input 

    if (!name || !nickname || !token) {
      throw new CustomError(422, "Ausência de parâmetro") 
    }

    const userExist = await this.userDB.getUserById(id)
    if(!userExist){
      throw new UserNotFound()
    }

    const tokenData = Authenticator.getTokenData(token)
    console.log(tokenData)

    if(tokenData.role !== "ADMIN") {
      throw new UnathorizedUser()
    }

    const editedUser :EditUserInput = {
      name, 
      nickname, 
      id
    }

    await this.userDB.editUser(editedUser)
  } */

  
}

