import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @Post("/signup")
    signUp(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDto){
        this.authService.signUp(authCredentialsDto)
    }

    @Post("/signin")
    signIn(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDto):Promise<{accessToken}>{
        return this.authService.signIn(authCredentialsDto)
    }

}
