import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto, UpdateNicknameUserDto, UpdatePasswordUserDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
export declare class UsersController {
    private configService;
    private usersService;
    private authService;
    constructor(configService: ConfigService, usersService: UsersService, authService: AuthService);
    createUser(body: CreateUserDto, res: Response): Promise<void>;
    updatePasswordUser(body: UpdatePasswordUserDto, req: Request): Promise<void>;
    updateNicknameUser(body: UpdateNicknameUserDto, req: Request): Promise<void>;
}
