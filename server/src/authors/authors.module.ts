import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsEntity } from 'src/entities/authors.entity';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';

@Module({
    imports: [TypeOrmModule.forFeature([AuthorsEntity])],
    controllers: [AuthorsController],
    providers: [AuthorsService],
})
export class AuthorsModule {}
