import { Controller, Get, Post, HttpException, HttpStatus, HttpCode, Body, UseGuards, Req, Res, UnauthorizedException, ValidationPipe, Patch, Param, BadRequestException, Query, NotFoundException} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto, UpdateNicknameUserDto, UpdatePasswordUserDto} from './dto/users.dto';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
    constructor(
        private configService: ConfigService,
        private usersService: UsersService,
        private authService: AuthService
    ){}

    //회원가입. body에 userID, password, name을 받는다.
    @Post()
    @HttpCode(201)
    async createUser(@Body() body: CreateUserDto, @Res() res: Response){
        try{
            await this.usersService.createUser(body);
            res.send({message: "성공적으로 회원가입이 되었습니다."});
        } catch(e){
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    //비밀번호, 이름 변경. 전부 바꾸는게 아니기 때문에 PUT이 아닌 PATCH를 사용했다.
    //JwtAuthGuard로 인해 req에 user값이 붙었다.
    //과연 update를 patch로 보내는 것이 맞을까?
    @Patch('/password')
    @HttpCode(200)
    async updatePasswordUser(@Body() body: UpdatePasswordUserDto, @Req() req: Request){
        if(body.userID !== req.user.userID){
            throw new BadRequestException('아이디가 다릅니다.');
        }
        else if(body.password === body.updatePassword){
            throw new BadRequestException('현재 비밀번호와 이전 비밀번호의 값이 같습니다.');
        }
        else{
            try{
                await this.usersService.updatePasswordUser(body);
            } catch(e){
                throw new BadRequestException(e.message);
            }
        }
    }

    @Patch('/nickname')
    @HttpCode(200)
    async updateNicknameUser(@Body() body: UpdateNicknameUserDto, @Req() req: Request){
        try{
            if(body.userID !== req.user.userID){
                throw new BadRequestException('아이디가 다릅니다.');
            }
            await this.usersService.updateNicknameUser(body);
        } catch(e){
            throw new BadRequestException(e.message);
        }
    }
}
