import { IsString ,IsNotEmpty,IsNumber} from "class-validator";


export class CreateProfileDto{

    @IsString()
    firstname:string;

    @IsString()
    lastname:string;

    @IsString()
    dob:string;

    @IsNumber()
    age:number;
}