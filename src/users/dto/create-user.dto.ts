import { IsEmail, IsNotEmpty, Length, MaxLength, MinLength } from "class-validator";


export class CreateUserDto { 


    @IsNotEmpty()
    @Length(4, 20)
    username: string;


    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    password: string;
}
