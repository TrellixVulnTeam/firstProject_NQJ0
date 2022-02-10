import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { TokenException } from "./token.e";
export declare class TokenExceptionFilter implements ExceptionFilter {
    catch(exception: TokenException, host: ArgumentsHost): void;
}
