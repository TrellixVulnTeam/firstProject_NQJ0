import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto, UpdateNicknameUserDto, UpdatePasswordUserDto, UpdateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>,
    ) {}

    //회원가입 시 DB에 중복된 값이 있는지 확인 후, 만든 User의 정보 DB에 등록.
    async createUser(dto: CreateUserDto){
        await this.checkDuplicatedUser(dto.userID, dto.nickname)
        await this.usersRepository.createQueryBuilder()
        .insert()
        .into(UsersEntity)
        .values(dto)
        .execute();
    }
    
    async updatePasswordUser(dto: UpdatePasswordUserDto){
        await this.usersRepository.createQueryBuilder()
        .update()
        .where(`userID = :keyID`, {keyID: dto.userID})
        .set({password: dto.updatePassword})
        .execute();
    }

    async updateNicknameUser(dto: UpdateNicknameUserDto){
        await this.checkDuplicatedUser(null, dto.updateNickname);
        await this.usersRepository.createQueryBuilder()
        .update()
        .where(`userID = :keyID`, {keyID: dto.userID})
        .set({nickname: dto.updateNickname})
        .execute();
    }

    async checkDuplicatedUser(userID: string, nickname: string){
        const duplicated = await this.usersRepository.createQueryBuilder()
        .select()
        .where(`userID = :keyID`, {keyID: userID})
        .orWhere(`nickname = :keyNickname`, {keyNickname: nickname})
        .getOne();
        if(duplicated){
            if(userID && duplicated.userID === userID){
                throw new Error('중복된 ID입니다.');
            } else if(nickname && duplicated.nickname === nickname){
                throw new Error('중복된 이름입니다.');
            }
        }
    }
}

