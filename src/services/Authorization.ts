
import * as jwt from "jsonwebtoken";
import { AuthenticationData } from "../models/User";

export class Authenticator {
    public generateToken = (payload: AuthenticationData): string => {
      const token = jwt.sign(payload,
        process.env.JWT_KEY as string,
        { expiresIn: "2h" });
      
      return token;
    };
  
    public getTokenData = (token: string): AuthenticationData => {
  
      const payload = jwt.verify(token, process.env.JWT_KEY as string) as jwt.JwtPayload
      const result: AuthenticationData = { id: payload.id }
  
      return result
    }
}

