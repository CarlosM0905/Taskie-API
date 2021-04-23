import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserRequest {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
