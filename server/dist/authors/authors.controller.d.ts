import { AuthorsService } from './authors.service';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
export declare class AuthorsController {
    private authorsService;
    private configService;
    constructor(authorsService: AuthorsService, configService: ConfigService);
    getAuthors(): Promise<any[]>;
    postAuthor(body: any): Promise<void>;
    getPage(params: any, res: Response): Promise<string>;
}
