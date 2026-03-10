import {
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsPositive,
    IsString,
    IsUrl,
    MinLength,
} from 'class-validator';
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    password: string;
    @IsInt()
    @IsPositive()
    roleId: number;
    @IsOptional()
    @IsUrl()
    profilePicture?: string;
}