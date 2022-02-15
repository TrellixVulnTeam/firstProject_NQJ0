import { HttpException } from "@nestjs/common";
export declare class AccessTokenException extends HttpException {
    constructor(message?: String);
}
export declare class RefreshTokenException extends HttpException {
    constructor(message?: String);
}
