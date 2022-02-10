import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy';
import { UsersEntity } from 'src/entities/users.entity';


@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]),
      PassportModule,
      JwtModule.register({
      secret: 'develope'
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy, ],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {

}
