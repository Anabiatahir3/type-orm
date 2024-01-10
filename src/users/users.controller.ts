import { UseInterceptors,Request,UseGuards,Controller,Patch,Get,Body,Post, ValidationPipe,Delete,Put,Param,Query} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { CreateProfileDto } from 'src/dtos/create-profile.dto';
import { CreatePostDto } from 'src/dtos/create-post.dto';
import { User } from 'src/typeorm/entities/user';
import { Post as post } from 'src/typeorm/entities/post';


import { AuthGuard } from 'src/auth/auth.guard';
import { UsersInterceptor } from 'src/interceptors/users.interceptor';
import { ConfigService } from '@nestjs/config';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/roles.enum';
import { RolesGuard } from 'src/auth/role.guard';
@Controller('users')
export class UsersController {
    constructor(private usersService:UsersService, private configService:ConfigService){}


@Roles(Role.Admin)
@UseGuards(AuthGuard,RolesGuard)
@UseInterceptors(UsersInterceptor)
@Get()
async getUsers(@Request()req):Promise<any[]>{
    console.log(req.user.role)
  // console.log(this.configService.get("host"))
   return this.usersService.findUsers()

}

@Get()
async findOne(@Query("username") username:string):Promise<User>{
    return this.usersService.findOne(username)
}




@Post()
createUser(@Body(ValidationPipe) createUserDto:CreateUserDto){
return this.usersService.createUser(createUserDto);
} 

@Patch(':id')
updateUserById(@Param('id',ParseIntPipe)id:number,@Body(ValidationPipe) updateUserDto:UpdateUserDto){
return this.usersService.updateUser(id,updateUserDto)
}

@Delete(":id")
deleteUser(@Param('id',ParseIntPipe)id:number){
    return this.usersService.deleteUser(id)
}

@Post(":id/profile")
createProfile(
    @Body(ValidationPipe)createProfileDto:CreateProfileDto,
    @Param('id',ParseIntPipe)id :number
    ){
return this.usersService.createUserProfile(id, createProfileDto)
}

@Post(":id/post")
createPost(
    @Body(ValidationPipe)createPostDto:CreatePostDto,
    @Param('id',ParseIntPipe) id:number
){
return this.usersService.createPost(id,createPostDto)
}

@Get(":userId/all")
async getAllUserPosts(
    @Param('userId',ParseIntPipe)id:number
){
return this.usersService.getAllPosts(id)
}
}
