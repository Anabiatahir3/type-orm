import { IsString ,IsNotEmpty} from "class-validator";

export class UpdateUserDto{
    //@IsString()
  
    username:string;

    //@IsString()

    password:string
}