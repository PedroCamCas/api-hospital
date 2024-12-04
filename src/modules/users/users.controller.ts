import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException, Put, UseGuards, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './user.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './user.entity';

@Controller('Users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get(":email")
  @UseGuards(JwtAuthGuard)
  async findAll(@Param('email') email: string){
    email = email.toLowerCase();
    const user = await this.userService.findOneByEmail(email);
    return {
      statusCode: HttpStatus.OK,
      message: 'User select',
      user
    };
    
  }

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

  @Put()
  @UseGuards(JwtAuthGuard)
  async update(@Body() user: User){
    const userUpdated = await this.userService.update(user);
        return {
            statusCode: HttpStatus.OK,
            message: 'User updated.',
            userUpdated
        };
  }

}
