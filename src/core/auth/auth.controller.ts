import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserRequest } from './dto/loginUser.dto';
import { RegisterUserRequest } from './dto/registerUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  async registerUser(@Body() body: RegisterUserRequest) {
    const registerResponse = await this.authService.registerUser(body);
    return registerResponse;
  }

  @Post('/login')
  async loginUser(@Body() body: LoginUserRequest) {
    const loginResponse = await this.authService.loginUser(body);
    return loginResponse;
  }
}
