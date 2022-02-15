import { ArgumentsHost, Catch, ExceptionFilter, HttpCode, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { RolesException } from "./roles.e";


@Catch(RolesException)
export class RolesExceptionFilter implements ExceptionFilter{
    catch(exception: RolesException, host: ArgumentsHost){
        const res: Response = host.switchToHttp().getResponse();
        res.status(HttpStatus.FORBIDDEN).send();
    }
}