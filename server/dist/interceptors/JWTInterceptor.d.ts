import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
export declare class JWTInterceptor implements NestInterceptor {
    private config;
    constructor(config: ConfigService);
    intercept(context: ExecutionContext, next: CallHandler<any>): import("rxjs").Observable<any>;
}
