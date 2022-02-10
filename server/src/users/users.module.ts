import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersEntity } from 'src/entities/users.entity';


@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]),
    AuthModule,
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {

}
