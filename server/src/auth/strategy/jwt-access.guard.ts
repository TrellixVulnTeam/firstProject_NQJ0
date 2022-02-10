import { ExecutionContext, ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException, UseInterceptors } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import jwtDecode from "jwt-decode";
import { Observable } from "rxjs";
import { Role } from "src/enums/role.enum";

@Injectable()
export class JwtAuthGuard extends AuthGuard('accessJWT') {
    constructor(private reflector: Reflector){
        super()
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
    }    
}