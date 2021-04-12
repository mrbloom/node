import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcrypt'

import { User } from "./user.entity";
import{AuthCredentialsDto} from "./dto/auth-credentials.dto"
import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { JwtPayload } from "./jwt-payload.interface";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp(authCredentials:AuthCredentialsDto):Promise<void>{
        const user = new User()
        user.salt = await bcrypt.genSalt()
        authCredentials.password = await this.hashPassword(authCredentials.password, user.salt)

        Object.assign(user,authCredentials)
        try {
            await user.save();
          } catch (err) {
            if (err.code === '23505') {
              throw new ConflictException('Username already exists');
            } else {
              throw new InternalServerErrorException();
            }
          }
    }

    async validateUserPassword(authCredentialsDto:AuthCredentialsDto):Promise<JwtPayload>{
        const {username,password} = authCredentialsDto;
        const user = await this.findOne({username})

        if(user && await user.validatePassword(password)){
            const {username,group} = user
            return {username, group}
        }else
            return null

    }

    private async hashPassword(password:string, salt:string):Promise<string>{
        return bcrypt.hash(password,salt)
    }
}