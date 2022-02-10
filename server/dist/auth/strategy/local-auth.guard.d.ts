import { ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
declare const LocalAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class LocalAuthGuard extends LocalAuthGuard_base {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    handleRequest<TUser = any>(err: any, user: any, info: any, context: any, status?: any): TUser;
}
export {};
