import { Injectable, UnauthorizedException } from '@nestjs/common'
import {PassportStrategy} from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import {Strategy,ExtractJwt} from 'passport-jwt'
import { JwtPayload } from './jwt-payload.interface'
import { User } from './user.entity'
import { UserRepository } from './user.repository'
import * as config from 'config'

const {secret} = config.get("jwt")
const {JWT_SECRET} = process.env

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:JWT_SECRET || secret
        })
    }

    async validate(payload:JwtPayload):Promise<User>{
        const {username,group} = payload;
        const user = await this.userRepository.findOne({username,group})

        if(!user){
            throw new UnauthorizedException()
        }

        return user
    }
}