import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';
import * as config from 'config'

const {expiresIn,secret} = config.get("jwt")
const {JWT_SECRET} = process.env

@Module({
    imports:[
        PassportModule.register({defaultStrategy:"jwt"}),
        JwtModule.register({
            secret:JWT_SECRET || secret,
            signOptions:{
                expiresIn
            }
        }),
        TypeOrmModule.forFeature([UserRepository])
    ],
    controllers: [AuthController],
    providers: [AuthService,JwtStrategy],
    exports:[
        JwtStrategy,
        PassportModule
    ]
})
export class AuthModule {}
