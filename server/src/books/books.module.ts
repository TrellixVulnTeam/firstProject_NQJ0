import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from 'src/entities/book.entity';
import { CommentEntity } from 'src/entities/comment.entity';
import { LikeCommentEntity } from 'src/entities/likecomment.entity';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
    imports: [TypeOrmModule.forFeature([BookEntity, CommentEntity, LikeCommentEntity])],
    controllers: [BooksController],
    providers: [BooksService],
})
export class BooksModule {}
