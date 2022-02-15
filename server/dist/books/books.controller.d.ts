import { Request, Response } from 'express';
import { BooksService } from './books.service';
import { PostBookDto } from './dto/book.dto';
export declare class BooksController {
    private booksService;
    constructor(booksService: BooksService);
    getBooksList(offset: number, limit: number): Promise<import("../entities/book.entity").BookEntity[]>;
    postBook(body: PostBookDto): Promise<void>;
    getBookInfo(bookID: number, req: Request, res: Response): Promise<void>;
    getBookInfoPage(bookID: any): Promise<{
        bookID: any;
    }>;
    getBookComment(bookID: number, req: Request, res: Response): Promise<void>;
    postBookComment(bookID: number, req: Request, res: Response): Promise<void>;
    deleteBookComment(commentID: number, req: Request, res: Response): Promise<void>;
    postCommentLike(commentID: number, req: Request, res: Response): Promise<void>;
    deleteCommentLike(commentID: number, req: Request, res: Response): Promise<void>;
}
