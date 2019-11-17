import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

/**
 * Passwords will contain at least 1 upper case letter
 * Passwords will contain at least 1 lower case letter
 * Passwords will contain at least 1 number or special character
 */
export const authRegEx = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(255)
  @Matches(authRegEx, { message: 'password too weak' })
  password: string;
}
