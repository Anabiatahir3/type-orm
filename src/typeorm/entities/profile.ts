import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"profiles"})
export class Profile{
    @PrimaryGeneratedColumn()
    id:number


    @Column()
    firstname:string

    @Column()
    lastname:string

    @Column()
    dob:string

    @Column()
    age:number

    @Column()
    createdAt:Date

}