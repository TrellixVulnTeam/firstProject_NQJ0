import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm';
import { LoginUserDto } from '../users/dto/users.dto';
import { pbkdf2, pbkdf2Sync } from 'crypto';
import { UsersEntity } from 'src/entities/users.entity';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>,
        private jwtService: JwtService,
    ) {}

    //로그인 시 DB의 정보와 request의 정보가 일치하는지 확인.
    async validateUser(user: LoginUserDto){
        const ret = await this.usersRepository.createQueryBuilder()
        .select(`userID`)
        .addSelect(`nickname`)
        .where(`userID = :keyID`, {keyID: user.userID})
        .andWhere(`password = :keyPassword`, {keyPassword: user.password})
        .getRawOne();
        return ret;
    }

    handleRefreshToken(){
        //로그인시 Refresh토큰 재발급 후 DB에 저장.
        //꼭 암호화해서 저장해야할까?
        const issueToken = async user => {
            const payload = { userID: user.userID, sub: user.nickname};
            const refreshToken = this.jwtService.sign(payload, {expiresIn: '5s'});
            pbkdf2(refreshToken, user.userID, 100, 64, 'sha512', async (err, key) => {
                if(err) {
                    throw err;
                }
                await this.usersRepository.createQueryBuilder()
                .update()
                .where(`userID = :keyID`, {keyID: user.userID})
                .set({refreshJWT: key.toString('base64')})
                .execute();
            });
            return refreshToken;
        }

        const deleteToken = async user => {
            await this.usersRepository.createQueryBuilder()
            .update()
            .where(`userID= :keyID`, {keyID: user.userID})
            .set({refreshJWT: null})
            .execute();
        }

        //Refresh토큰 Validation시 DB와 쿠키에 있는 Refresh토큰 비교.
        //같으면 true 및 user값, 틀리면 false 반환.
        const compareToken = async (user, token) => {
            const query = await this.usersRepository.createQueryBuilder()
            .select(`refreshJWT`)
            .where(`userID = :keyID`, {keyID: user.userID})
            .getRawOne();
            const refreshToken = query['refreshJWT'];
            if(token === null){
                if(refreshToken === null) return true;
                else return false;
            } else{ 
                const encryptedToken = pbkdf2Sync(token, user.userID, 100, 64, 'sha512');
                if(encryptedToken.toString('base64') === refreshToken){
                    return true;
                } else{
                    return false;
                }
            }
        }
        return {issueToken, deleteToken, compareToken}
    }
    //Access토큰 새로 발급.
    async issueAccessToken(user){
        const payload = { userID: user.userID, sub: user.nickname};
        return this.jwtService.sign(payload, {expiresIn: '1s'});
    }

}
