import { CallHandler, ExecutionContext, Injectable,NestInterceptor} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import {Observable,map} from 'rxjs'
import { User  } from "src/typeorm/entities/user";
@Injectable()
export class UsersInterceptor implements NestInterceptor{
    intercept(context:ExecutionContext,next:CallHandler<any>):Observable<User[]>| Promise<Observable<any>>{
        console.log(context.getClass().name)
        return next.handle().pipe(
            //map((data)=>data.map(({password,...user})=>user))
            map((data)=>data.map((user)=>plainToInstance(User,user)))
        )
        
    } 
}
