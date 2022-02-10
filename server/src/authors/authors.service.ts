import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorsEntity } from 'src/entities/authors.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorsService {
    constructor(
        @InjectRepository(AuthorsEntity)
        private readonly authorsRepository: Repository<AuthorsEntity>
    ) {}
    async getAuthors(){
        const value = await this.authorsRepository.createQueryBuilder()
        .select()
        .getMany();
        return value;
    }
    
    async postAuthor(dto){
        await this.checkDuplicatedAuthor(dto.author);
        await this.authorsRepository.createQueryBuilder()
        .insert()
        .into(AuthorsEntity)
        .values(dto)
        .execute();
        return true;
    }

    async checkDuplicatedAuthor(author: string){
        const res = await this.authorsRepository.createQueryBuilder()
        .select()
        .where(`author = :keyAuthor`, {keyAuthor: author})
        .getOne();
        if(res){
            throw new Error(`이미 존재하는 작가입니다. 작가 이름 = ${res.author}`);
        }
    }
}
