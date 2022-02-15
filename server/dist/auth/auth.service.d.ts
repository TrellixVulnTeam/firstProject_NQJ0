import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { LoginUserDto } from '../users/dto/users.dto';
import { UsersEntity } from 'src/entities/users.entity';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly usersRepository;
    private jwtService;
    private config;
    constructor(usersRepository: Repository<UsersEntity>, jwtService: JwtService, config: ConfigService);
    validateUser(user: LoginUserDto): Promise<any>;
    handleRefreshToken(): {
        issueToken: (user: any) => Promise<string>;
        deleteToken: (user: any) => Promise<void>;
        compareToken: (user: any, token: any) => Promise<boolean>;
    };
    issueAccessToken(user: any): Promise<string>;
}
