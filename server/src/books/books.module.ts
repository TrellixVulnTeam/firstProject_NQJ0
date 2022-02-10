import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksEntity } from 'src/entities/books.entity';
import { ReadEntity } from 'src/entities/read.entity';
import { UsersService } from 'src/users/users.service';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
    imports: [TypeOrmModule.forFeature([BooksEntity, ReadEntity])],
    controllers: [BooksController],
    providers: [BooksService],
})
export class BooksModule {}
