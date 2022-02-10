import { BadRequestException, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

export class LocalAuthGuard extends AuthGuard('local'){
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
    }
    handleRequest<TUser = any>(err: any, user: any, info: any, context: any, status?: any): TUser {
        if(err){
            throw err;
        } else if(!user){
            throw new UnauthorizedException('로그인 정보가 맞지 않습니다.');
        }
        return user;
    }
    
}