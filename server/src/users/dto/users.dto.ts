import { IsString, MaxLength, MinLength } from "class-validator";
import { Match } from "src/decorators/match.decorator";
import { Unique } from "typeorm";

export class LoginUserDto {
    userID: string;
    password: string;
}

@Unique(['userID'])
export class CreateUserDto{
    @MinLength(5, {
        message: 'ID는 5글자 이상이어야 합니다.'
    })
    @MaxLength(20, {
        message: 'ID는 20글자 이하여야 합니다.'
    })
    userID: string;
    @IsString()
    password: string;
    @MinLength(2, {
        message: '이름은 2글자 이상이어야 합니다.'
    })
    @MaxLength(10, {
        message: '이름은 10글자 이하여야 합니다.'
    })
    nickname: string;
}

export class UpdateUserDto {
    @IsString()
    userID: string;
    @IsString()
    password: string;
}

export class UpdatePasswordUserDto extends UpdateUserDto {
    @IsString()
    updatePassword: string;
    @Match('updatePassword', {
        message: '두 비밀번호의 값이 일치하지 않습니다.'
    })
    verifyPassword: string;
}

export class UpdateNicknameUserDto extends UpdateUserDto {
    @MinLength(2, {
        message: '이름은 2글자 이상이어야 합니다.'
    })
    @MaxLength(10, {
        message: '이름은 10글자 이하여야 합니다.'
    })
    updateNickname: string;
}