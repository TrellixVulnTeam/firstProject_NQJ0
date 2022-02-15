import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/entities/book.entity';
import { CommentEntity, CommentModel } from 'src/entities/comment.entity';
import { LikeCommentEntity } from 'src/entities/likecomment.entity';
import { Repository } from 'typeorm';
import { BookInfoModel, GetBooksListDto, PostBookDto } from './dto/book.dto';
import { PostCommentDto } from './dto/comment.dto';


@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>,
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>,
        @InjectRepository(LikeCommentEntity)
        private readonly likeCommentRepository: Repository<LikeCommentEntity>
    ) {}
    
    async getBooksList(dto: GetBooksListDto){
        const res = await this.bookRepository.createQueryBuilder()
        .select()
        .offset(dto.offset)
        .limit(dto.limit).getMany();
        return res;
    }

    async getBookInfoByID(bookID: number): Promise<BookInfoModel> {
        const res: BookInfoModel = await this.bookRepository.createQueryBuilder()
        .where('ID = :keyBookID', {keyBookID: bookID})
        .getOne();
        return res;
    }

    async postBook(dto: PostBookDto){
        await this.checkDuplicatedBook(dto.title, dto.author);
        return (await this.bookRepository.createQueryBuilder()
        .insert()
        .into(BookEntity)
        .values(dto)
        .execute()).raw.affectedRows;
    }

    async checkDuplicatedBook(title: string, author: string){
        const res = await this.bookRepository.createQueryBuilder()
        .select()
        .where(`title = :keyTitle`, {keyTitle: title})
        .andWhere(`author = :keyAuthor`, {keyAuthor: author})
        .getOne();
        if(res){
            throw new Error(`이미 존재하는 책입니다. 책 번호 = ${res.ID}`);
        }
    }

    async getComments(userID: string, bookID: number){
        const entity = await this.commentRepository.createQueryBuilder("comment")
        .where("comment.bookID = :keyBookID", {keyBookID: bookID})
        .leftJoinAndSelect("comment.like", "like")
        .getMany();
        const res = [];
        entity.forEach(comment => {
            const model = new CommentModel(comment, userID);
            res.push(model);
        });
        return res;
    }

    async postComment(dto: PostCommentDto){
        const isSuccessed = (await this.commentRepository.createQueryBuilder()
        .insert()
        .into(CommentEntity)
        .values(dto)
        .execute()).raw.affectedRows
        console.log(`in postComment = ${isSuccessed}`);
        if(isSuccessed){
            return true;
        } else{
            return false;
        }
    }

    async deleteComment(commentID: number){
        const isSuccessed = (await this.commentRepository.createQueryBuilder()
        .delete()
        .from(CommentEntity)
        .where(`ID= ${commentID}`)
        .execute());
    }

    async postCommentLike(commentID: number, userID: string){
        await this.likeCommentRepository.createQueryBuilder()
        .insert()
        .values([
            {commentID, userID}
        ]).execute();
    }

    async deleteCommentLike(commentID: number, userID: string){
        await this.likeCommentRepository.createQueryBuilder()
        .delete()
        .where(`commentID = :keyCommentID`, {keyCommentID: commentID})
        .andWhere(`userID = :keyUserID`, {keyUserID: userID})
        .execute();
    }
}
