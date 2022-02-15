import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private config;
    constructor(config: ConfigService);
    validate(payload: any): Promise<{
        userID: any;
        nickname: any;
    }>;
}
export {};
