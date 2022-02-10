import { BooksEntity } from 'src/entities/books.entity';
import { ReadEntity } from 'src/entities/read.entity';
import { Repository } from 'typeorm';
import { BookInfoModel, GetBooksListDto, PostBookDto } from './dto/books.dto';
export declare class BooksService {
    private readonly booksRepository;
    private readonly readRepository;
    constructor(booksRepository: Repository<BooksEntity>, readRepository: Repository<ReadEntity>);
    getBooksList(dto: GetBooksListDto): Promise<any[]>;
    getBookInfoByID(id: number): Promise<BookInfoModel>;
    postBook(dto: PostBookDto): Promise<any>;
    checkDuplicatedBook(title: string, author: string): Promise<void>;
}
