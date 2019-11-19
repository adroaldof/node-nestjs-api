import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export const emailRegex = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+){2,}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9]){1,}?\.(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9]))+$/;

/**
 * Explaining Regex
 * (?=.*[a-z]) - assert lowercase chars
 * (?=.*[A-Z]) - assert uppercase chars
 * (?=.*[0-9]) - assert number 0 to 9
 * (?=.*[$@$!#%*?&]) - assert special char list
 * [A-Za-zd$@$!#%*?&] - allowed char list
 * .{8,100} - char length should be between 8 and 100
 */
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!#%*?&])[A-Za-zd$@$!#%*?&].{7,254}$/;

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @Matches(emailRegex, { message: 'invalid email' })
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(255)
  @Matches(passwordRegex, { message: 'password too weak' })
  password: string;
}
