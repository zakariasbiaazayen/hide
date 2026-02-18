import { IsDate, IsString, IsEmail, IsEnum, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @Type(() => Date)   // <<< THIS IS KEY
  @IsDate()
  dateOfBirth: Date;

  @IsEnum(['user', 'admin'])
  role: string;

  @IsNumber()
  phoneNumber: number;

  @IsString()
  University: string;

  @IsString()
  major: string;

  @IsNumber()
  Experience: number;

  @IsString()
  LinkedIn: string;
}
