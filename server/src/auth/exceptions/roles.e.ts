import { HttpException, HttpStatus } from "@nestjs/common";

export class RolesException extends HttpException{
    constructor(message: String= 'ss'){
        super(message, HttpStatus.UNAUTHORIZED);
    }
}