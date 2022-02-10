import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from "@nestjs/common";
import { Response } from "express";

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter{
    catch(exception: NotFoundException, host: ArgumentsHost) {
        const res = host.switchToHttp().getResponse<Response>();
        res.redirect('/');
    }
}