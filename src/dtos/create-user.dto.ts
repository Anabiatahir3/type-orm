import { IsString ,IsNotEmpty, IsObject, IsEnum} from "class-validator";
import { Role } from "src/enums/roles.enum";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    username:string;

    @IsString()
    @IsNotEmpty()
    password:string

    @IsEnum(Role)
    role:string
}