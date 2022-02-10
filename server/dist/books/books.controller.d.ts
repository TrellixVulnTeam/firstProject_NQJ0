import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { BooksService } from './books.service';
import { BookInfoModel, PostBookDto } from './dto/books.dto';
export declare class BooksController {
    private booksService;
    private configService;
    constructor(booksService: BooksService, configService: ConfigService);
    getBooksList(offset: number, limit: number): Promise<any[]>;
    postBook(body: PostBookDto): Promise<void>;
    getBookInfo(bookID: number, req: Request, res: Response): Promise<void>;
    getBookInfoPage(bookID: any): Promise<BookInfoModel>;
}
