import { Controller, Post,Body ,ValidationPipe} from '@nestjs/common';
import { SignInDto } from 'src/dtos/sign-in.dto';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    

    @Post("login")    
    signIn(@Body(ValidationPipe)signInDto:SignInDto){
        return this.authService.signIn(signInDto)

    }
}
