import {
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    username: string;

    @IsString()
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password is weak',
    })
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}

// @IsStrongPassword({
//     minLength: 8,
//     minNumbers: 1,
//     minSymbols: 1,
//     minUppercase: 1
// })
