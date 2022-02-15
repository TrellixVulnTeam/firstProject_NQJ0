import { HttpException } from "@nestjs/common";
export declare class RolesException extends HttpException {
    constructor(message?: String);
}
