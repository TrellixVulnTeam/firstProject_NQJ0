import { HttpException, HttpStatus } from "@nestjs/common";

export class TokenException extends HttpException{
    constructor(){
        super('Token has Expired', HttpStatus.UNAUTHORIZED);
    }
}