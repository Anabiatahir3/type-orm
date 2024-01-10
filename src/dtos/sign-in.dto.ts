// import { CreateUserDto } from "./create-user.dto";
// import { Exclude } from "class-transformer";

// export class SignInDto extends CreateUserDto{
//     @Exclude()
//     role: string;
// }
import { IsString ,IsNotEmpty, IsObject, IsEnum} from "class-validator";

export class SignInDto{
    @IsString()
    @IsNotEmpty()
    username:string;

    @IsString()
    @IsNotEmpty()
    password:string
}