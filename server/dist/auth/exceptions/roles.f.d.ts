import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { RolesException } from "./roles.e";
export declare class RolesExceptionFilter implements ExceptionFilter {
    catch(exception: RolesException, host: ArgumentsHost): void;
}
