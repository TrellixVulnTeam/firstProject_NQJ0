import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
declare const JwtRefreshStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    private config;
    private authService;
    constructor(config: ConfigService, authService: AuthService);
    validate(req: Request, payload: any): Promise<{
        userID: any;
        nickname: any;
    }>;
}
export {};
