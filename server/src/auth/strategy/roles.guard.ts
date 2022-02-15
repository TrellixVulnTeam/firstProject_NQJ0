import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { RolesException } from "../exceptions/roles.e";
import { Role, ROLES_KEY } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requireRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if(!requireRoles) return true;
        const {user} = context.switchToHttp().getRequest();
        if(!user) throw new RolesException("로그인 후 이용해주세요.");
        else if(requireRoles.some(v => user.userID === v)){
            return true;
        } else{
            throw new RolesException("권한이 맞지 않습니다.");
        }
    }
}