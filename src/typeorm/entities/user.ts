import { Entity, PrimaryGeneratedColumn,Column, OneToOne,OneToMany, JoinColumn } from "typeorm";
import { Profile } from "./profile";
import { Post } from "./post";
import { Exclude } from "class-transformer";
import { IsEnum } from "class-validator";
import { Role } from "src/enums/roles.enum";
@Entity({name:"users"})
export class User{
    @PrimaryGeneratedColumn({type:"bigint"})
    id :number

    @Column({unique:true})
    username:string;

    @Column()
    @Exclude()
    password:string;

    @Column()
    createdAt:Date;

    @Column({nullable:true})
    authStrategy:string

    
    @Column({type:'enum',enum:Role,default:Role.User})
    role:Role

@OneToOne(()=>Profile)
@JoinColumn()
profile:Profile;




@OneToMany(()=>Post,(post)=>post.user)
posts:Post[]
//posts is the property name on user entity that associates with Post entity

}