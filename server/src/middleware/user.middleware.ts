import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction, Request } from 'express';
import jwtDecode from 'jwt-decode';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try{
        const decoded = jwtDecode<{userID: string, sub: string}>(req.cookies.accessJWT);
        if(decoded){
            req.user = {userID: decoded.userID, nickname: decoded.sub}
        } else{
            req.user = null;
        }
    } catch(e){
        req.user = null;
    } finally{
        next();
    }
}
}
