import { BadRequestException, HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super({usernameField: 'userID'});
    }
    //response에서 받아옴. passport의 localstrategy의 요청에는 userID와 password가 필수.
    async validate(userID: string, password: string){
        const user = await this.authService.validateUser({userID, password});
        if(!user){
            throw new HttpException('아이디와 비밀번호가 일치하지 않습니다.', 400);
        }
        return user;
    }
}