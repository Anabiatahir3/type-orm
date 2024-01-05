import { Entity, PrimaryGeneratedColumn,Column, ManyToOne } from "typeorm";
import { User } from "./user";
@Entity({name:'posts'})
export class Post{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    title:string;

    @Column()
    description:string;

    @ManyToOne(()=>User,(user)=>user.posts)
    user:User;
//user is the name of the property that is linked to users


}