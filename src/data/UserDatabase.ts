import { CustomError } from "../errors/CustomError";
import { User } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";
import { UserRepository } from "../business/UserRepository";

export class UserDatabase extends BaseDatabase implements UserRepository{

    private static TABLE_NAME = "lama_users"
 
    async signup(signup: User): Promise<void> {
        try {
            await UserDatabase.connection
                .insert(signup)
                .into(UserDatabase.TABLE_NAME)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.sqlMessage || error.message)
        }
    }

    async findUserEmail(email: string): Promise<User> {
        try {
            const user = await UserDatabase.connection
                .select(`*`)
                .where({ email })
                .into(UserDatabase.TABLE_NAME)

            return user[0]

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.sqlMessage || error.message)
        }
    }

    async selectByUser(id: string): Promise<User> {
        try {

            const user = await UserDatabase.connection
                .select("id", "name", "email")
                .where({id})
                .into(UserDatabase.TABLE_NAME)

            return user[0]
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.sqlMessage || error.message)
        }
    }

    async selectUserById(id: string): Promise<User> {
        try {
            const user = await UserDatabase.connection
                .select("name", "email")
                .where({ id })
                .into(UserDatabase.TABLE_NAME)

            return user[0]
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.sqlMessage || error.message)
        }
    }
}

   /*  public async createUser(
        id: string,
        email: string,
        name: string,
        password: string,
        role: string
    ): Promise<void> {
        try {
            UserDatabase.connection
            await this.Connection()
            .insert({
                id,
                email,
                name,
                password,
                role
            })
            .into(UserDatabase.TABLE_NAME)
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message);
            
        }
    }
   
    public findUserByEmail = async (email: string) => {
        try {
          const result = await UserDatabase.connection("Auth_users")
            .select()
            .where({email});
          return result[0];
        } catch (error: any) {
          throw new CustomError(400, error.sqlMessage);
        }
      };
      
      public getUserById = async (id: string) => {
        try {
          const result = await UserDatabase.connection("Auth_users")
            .select()
            .where({id});
          return result[0];

        } catch (error: any) {
          throw new CustomError(400, error.sqlMessage);
        }
      };
 */