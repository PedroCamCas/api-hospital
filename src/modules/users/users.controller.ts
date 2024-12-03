import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './user.dto';
import { AuthService } from '../auth/auth.service';

@Controller('Users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(
    @Body() newUser: UserDTO) {
    const user = await this.userService.createUser(newUser);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Registered user.',
      user: { id: user.id, name: user.name, email: user.email },
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() { email, password }: { email: string; password: string }) {
    const user = await this.userService.validateUser(email, password);
    if(!user){
      throw new UnauthorizedException('Invalid credentials.');
    }
    return this.authService.generatedToken(user);
  }
}
