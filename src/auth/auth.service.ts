import { Injectable,UnauthorizedException } from '@nestjs/common';
import { SignInDto } from 'src/dtos/sign-in.dto';
import { UsersService } from 'src/users/users.service';
import { SignInParams } from 'src/utils/types';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(private usersService:UsersService,private jwtService:JwtService){}
    async signIn(signInDetails:SignInParams){
        const user=await this.usersService.findOne(signInDetails.username)
    if (user?.password!==signInDetails.password){
        throw new UnauthorizedException("Incorrect password")
    }
    // const {password,...result}=user
    // return result;

    const payload={sub:user.id,username:user.username,role:user.role}
    return {
        access_token:await this.jwtService.signAsync(payload),
    }
    }
   
}
