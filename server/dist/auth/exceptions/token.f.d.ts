import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AccessTokenException, RefreshTokenException } from "./token.e";
export declare class AccessTokenExceptionFilter implements ExceptionFilter {
    catch(exception: AccessTokenException, host: ArgumentsHost): void;
}
export declare class RefreshTokenExceptionFilter implements ExceptionFilter {
    private config;
    constructor(config: ConfigService);
    catch(exception: RefreshTokenException, host: ArgumentsHost): void;
}
