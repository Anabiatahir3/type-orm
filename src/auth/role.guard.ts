import {CanActivate,ExecutionContext,Injectable} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import {Observable} from 'rxjs'
import { ROLES_KEY } from 'src/decorators/role.decorator'
import { Role } from 'src/enums/roles.enum'


export class RolesGuard implements CanActivate{
    constructor(private reflector:Reflector){}
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        // try {
        //     const requiredRoles=this.reflector.getAllAndOverride<Role[]>(ROLES_KEY,[
        //         context.getHandler(),
        //         context.getClass()
        //     ])
        //     if (!requiredRoles){
        //         return true
        //     }
        //     const {user}=context.switchToHttp().getRequest()
        //     return requiredRoles.some((role) => user.roles?.includes(role));
            
        // } catch (error) {
        //     console.log(error)
        // }
       
        const {user}=context.switchToHttp().getRequest()
        const requiredRoles=this.reflector.getAllAndOverride(ROLES_KEY,[
            context.getHandler(),
            context.getClass()
        ])
        console.log(user,requiredRoles)
        return true
       
        //return requiredRoles.includes(user?.role)
    }

}