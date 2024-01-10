import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { jwtConstants } from './constants';
  import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor (private jwtService:JwtService,private usersService:UsersService){}

    async canActivate(context:ExecutionContext):Promise<boolean>{
        const request=context.switchToHttp().getRequest();
        const token=this.extractTokenFromHeader(request)
        if (!token){
            throw new UnauthorizedException("you are not signed in")
        }
        try {

            const payload=await this.jwtService.verifyAsync(
                token,{
                    secret:jwtConstants.secret
                }
            )
            //in the auth guard we have extracted the user details 
            //and on the request object attached another header of user with the details of the user
          
            request['user']=payload

        }catch{
            throw new UnauthorizedException()
        }
        return true
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
      }
}
