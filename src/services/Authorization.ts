
import * as jwt from "jsonwebtoken";
import { IAuthenticator } from "../business/Ports";
import { AuthenticationData } from "../models/User";

export class Authenticator implements IAuthenticator {
    public generateToken = (payload: AuthenticationData): string => {
      const token = jwt.sign(
        payload,
        process.env.JWT_KEY as string,
        { expiresIn: "2h" });
      
      return token;
    };
  
    public getTokenData = (token: string): AuthenticationData => {
      const payload = jwt.verify(
        token,
        process.env.JWT_KEY as string
       ) as jwt.JwtPayload
       //) as AuthenticationData
      const result: AuthenticationData = { id: payload.id , role: payload.role}

      return result
      //return payload
    }
}

