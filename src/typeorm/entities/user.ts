import { Entity, PrimaryGeneratedColumn,Column, OneToOne,OneToMany, JoinColumn } from "typeorm";
import { Profile } from "./profile";
import { Post } from "./post";
import { Exclude } from "class-transformer";
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
@OneToOne(()=>Profile)
@JoinColumn()
profile:Profile;

@OneToMany(()=>Post,(post)=>post.user)
posts:Post[]
//posts is the property name on user entity that associates with Post entity

}