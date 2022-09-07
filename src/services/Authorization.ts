
import * as jwt from "jsonwebtoken";
import { IAuthenticator } from "../business/Ports";
import { AuthenticationData } from "../models/User";

export class Authenticator implements IAuthenticator {
    generateToken = (payload: AuthenticationData) :string => {
        const token = jwt.sign(
            payload, 
            process.env.JWT_KEY as string, 
            {expiresIn: process.env.JWT_EXPIRES_IN}
        )

        return token
    }

    getTokenData = (token: string) :AuthenticationData => {
        const result = jwt.verify(
            token, 
            process.env.JWT_KEY as string
        ) as AuthenticationData

        return result
    }
}

export default new Authenticator()