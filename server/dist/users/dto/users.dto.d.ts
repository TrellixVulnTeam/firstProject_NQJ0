export declare class LoginUserDto {
    userID: string;
    password: string;
}
export declare class CreateUserDto {
    userID: string;
    password: string;
    nickname: string;
}
export declare class UpdateUserDto {
    userID: string;
    password: string;
}
export declare class UpdatePasswordUserDto extends UpdateUserDto {
    updatePassword: string;
    verifyPassword: string;
}
export declare class UpdateNicknameUserDto extends UpdateUserDto {
    updateNickname: string;
}
