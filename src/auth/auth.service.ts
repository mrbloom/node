import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService')
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository,
        private jwtService:JwtService
    ){}

    async signUp(authCredentials:AuthCredentialsDto):Promise<void>{
        this.logger.debug(`${JSON.stringify(authCredentials)} signed up`)
        return this.userRepository.signUp(authCredentials)
    }

    async signIn(authCredentialsDto):Promise<{accessToken}>{
        const result= await this.userRepository.validateUserPassword(authCredentialsDto)
        console.log(result)
        if(!result)
            throw new UnauthorizedException(`Wrong credentials`)

        const payload:JwtPayload =result
        
        const accessToken = await this.jwtService.sign(payload)
        this.logger.debug(`${JSON.stringify(payload)} generated token ${accessToken}`)

        return {accessToken}
    }
}
