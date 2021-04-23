import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserRequest } from './dto/loginUser.dto';
import { RegisterUserRequest } from './dto/registerUser.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async registerUser(body: RegisterUserRequest) {
    const newUser = new User();
    newUser.user_username = body.username;
    newUser.user_name = body.name;
    newUser.user_password = body.password;
    newUser.user_email = body.email;
    try {
      const userRegistered = await this.userRepository.save(newUser);
      return userRegistered;
    } catch (error) {
      return new ConflictException();
    }
  }

  async loginUser(body: LoginUserRequest) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .select(['user'])
        .where('user.user_username = :username', { username: body.username })
        .andWhere('user.user_password = :password', {
          password: body.password,
        })
        .getOne();
      if (user) {
        delete user.user_password;
        return { isLogged: true, user };
      } else {
        return new UnauthorizedException();
      }
    } catch (error) {
      return new InternalServerErrorException();
    }
  }
}
