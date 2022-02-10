import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksEntity } from 'src/entities/books.entity';
import { ReadEntity } from 'src/entities/read.entity';
import { Repository } from 'typeorm';
import { BookInfoModel, GetBooksListDto, PostBookDto } from './dto/books.dto';


@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(BooksEntity)
        private readonly booksRepository: Repository<BooksEntity>,
        @InjectRepository(ReadEntity)
        private readonly readRepository: Repository<ReadEntity>
    ) {}
    
    async getBooksList(dto: GetBooksListDto){
        const res = await this.booksRepository.createQueryBuilder('books')
        .select([`books.bookID AS bookID`, 'books.title AS title', 
        'books.author AS author', 'COUNT(IF(read.like = 1, 1, null)) AS `like`',
        'COUNT(readID) AS `read`'])
        .leftJoin(`read`, `read`,`books.bookID = read.bookID`)
        .groupBy('books.bookID')
        .offset(dto.offset)
        .limit(dto.limit).getRawMany();
        return res;
    }

    async getBookInfoByID(id: number): Promise<BookInfoModel> {
        const res: BookInfoModel = await this.booksRepository.createQueryBuilder()
        .where('bookID = :keyBookID', {keyBookID: id})
        .getOne();
        return res;
    }

    async postBook(dto: PostBookDto){
        await this.checkDuplicatedBook(dto.title, dto.author);
        return (await this.booksRepository.createQueryBuilder()
        .insert()
        .into(BooksEntity)
        .values(dto)
        .execute()).raw.affectedRows;
    }

    async checkDuplicatedBook(title: string, author: string){
        const res = await this.booksRepository.createQueryBuilder()
        .select()
        .where(`title = :keyTitle`, {keyTitle: title})
        .andWhere(`author = :keyAuthor`, {keyAuthor: author})
        .getOne();
        if(res){
            throw new Error(`이미 존재하는 책입니다. 책 번호 = ${res.bookID}`);
        }
    }
}
