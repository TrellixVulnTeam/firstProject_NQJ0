import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateNicknameUserDto, UpdatePasswordUserDto } from './dto/users.dto';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<UsersEntity>);
    createUser(dto: CreateUserDto): Promise<void>;
    updatePasswordUser(dto: UpdatePasswordUserDto): Promise<void>;
    updateNicknameUser(dto: UpdateNicknameUserDto): Promise<void>;
    checkDuplicatedUser(userID: string, nickname: string): Promise<void>;
}
