export class CreateUserParams{
    username:string;
    password:string;
}

export class UpdateUserParams{
    username:string;
    password:string;
}

export class CreateProfileParams{
    firstname:string;
    lastname:string;
    dob:string;
    age:number;
    
}

export class CreatePostParams{
    title:string;
    description:string;
}

export class SignInParams{
    username:string;
    password:string;
}