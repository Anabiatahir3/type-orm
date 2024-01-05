import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user';
import { CreateProfileParams,CreatePostParams, CreateUserParams, UpdateUserParams } from 'src/utils/types';
import  {EntityNotFoundError, Repository} from "typeorm"
import { NotFoundException } from '@nestjs/common/exceptions';
import { Profile } from 'src/typeorm/entities/profile';
import { Post } from 'src/typeorm/entities/post';

@Injectable()
export class UsersService {
constructor(
    @InjectRepository(User) private UserRepository :Repository<User>,
    @InjectRepository(Profile) private ProfileRepository :Repository<Profile>,
    @InjectRepository(Post) private PostRepository :Repository<Post>

){}

    async findUsers(){
const users=await this.UserRepository.find({relations:['profile','posts']})
//const result = users.map(({ password, ...rest }) => rest);
return users;
    }

    createUser(userDetails:CreateUserParams){
const newUser=this.UserRepository.create({
    ...userDetails, createdAt:new Date()
})

return this.UserRepository.save(newUser)
    }
    
    async updateUser(id:number,updateUserParams:UpdateUserParams){
        const existingUser=await this.UserRepository.findOneBy({id})
        if (!existingUser){
            throw new NotFoundException('User not found')
        }
    return this.UserRepository.update({id},{...updateUserParams})
    }

    async deleteUser(id:number){
        const oldUser=await this.UserRepository.findOneBy({id})
        if (!oldUser){
            throw new NotFoundException("no user ")
        }
        return this.UserRepository.delete({id})
    }
//onetoone relation
    async createUserProfile(id:number, profileDetails:CreateProfileParams){

        const user=await this.UserRepository.findOneBy({id})
        if (!user){
            throw new NotFoundException("No user found")
        }

        const profile =this.ProfileRepository.create({...profileDetails, createdAt:new Date()})
    const savedProfile=await this.ProfileRepository.save(profile)
user.profile=savedProfile;
return this.UserRepository.save(user)

}
//onetomany relation
async createPost(id:number,postDetails:CreatePostParams){
    const user=await this.UserRepository.findOneBy({id})
    if(!user){
        throw new NotFoundException("No user found")
    }
const post=this.PostRepository.create({...postDetails,user})
return await this.PostRepository.save(post)


}

//this method is used to get all the posts made by a sibgle user
async getAllPosts(userId:number){
return this.PostRepository.createQueryBuilder('post')
// .leftJoinAndSelect('post.user',"user")
// .where('userId=:userId',{userId})
// .getRawMany()

.select(['post.id', 'post.title', 'post.description']) // Select only the desired fields
.innerJoin('post.user', 'user') // Use innerJoin instead of innerJoinAndSelect

//The .innerJoin('post.user', 'user') is used to perform an inner join with the user property on the Post entity.
// This ensures that the condition in the .where clause can be based on the user ID.
.where('user.id = :userId', { userId })
.getMany();


}

async findOne(username:string){
    const user= this.UserRepository.findOneBy({username})
    if (!user){
        throw new NotFoundException("No user of this username found")
    }
    return user;
}
}
