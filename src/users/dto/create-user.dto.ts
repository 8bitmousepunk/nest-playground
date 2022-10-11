import { IsString, IsEmail, Length } from 'class-validator'

export class CreateUserDto {
    @IsString({message: 'email should be a string'})
    @IsEmail({}, { message: 'invalid email format'})
    readonly email: string;

    @IsString({ message: 'password should be a string'})
    @Length(4, 16, {message: 'password should be between 4 and 16 characters'})
    readonly password: string;
}