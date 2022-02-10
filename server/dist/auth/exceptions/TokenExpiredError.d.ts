import { HttpException } from "@nestjs/common";
export declare class TokenExpiredError extends HttpException {
    constructor();
}
