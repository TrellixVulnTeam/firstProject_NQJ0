import { NestMiddleware } from '@nestjs/common';
import { Response, NextFunction, Request } from 'express';
export declare class UserMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void;
}
