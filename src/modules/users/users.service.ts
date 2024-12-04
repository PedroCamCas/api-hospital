import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as crypto from 'crypto';
import { UserDTO } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string){
    const user = await this.userRepository.findOne({
        where: { email } 
    });
    if (!user) {
        throw new NotFoundException(`User with email: ${email} not found.`);
    }
    return user;
}

  async createUser(user: UserDTO): Promise<User> {
    if(!user.name || !user.email || !user.password){
      throw new UnauthorizedException('Invalid credentials.');
    }
    user.email = user.email.toLowerCase();
    const existingUser = await this.userRepository.findOne({ where: { email: user.email } });
    if (existingUser) {
      throw new ConflictException('Email in use.');
    }

    const hashedPassword = this.hashPassword(user.password);
    const newUser = this.userRepository.create({ name: user.name, email: user.email, password: hashedPassword });
    return this.userRepository.save(newUser);
  }

  async update(user: User) {
    if(!user.id || !user.name || !user.email || !user.password){
      throw new UnauthorizedException('Invalid credentials.');
    }
    user.email = user.email.toLowerCase();
    const existingUser = await this.userRepository.findOne({ where: { id: user.id } });
    if (!existingUser) {
      throw new ConflictException('User not found.');
    }
    if(user.email != existingUser.email){
      const emailMatch = await this.userRepository.find({ where: { email: user.email } });
      if(emailMatch.length > 0){
        throw new ConflictException('Email in use.');
      }
    }

    user.password = await this.hashPassword(user.password);
    return await this.userRepository.update(user.id, user);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    email = email.toLowerCase();
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
        throw new UnauthorizedException('Invalid credentials.');
    }

    const hashedPassword = this.hashPassword(password);
    if (user.password !== hashedPassword) {
        throw new UnauthorizedException('Invalid credentials.');
    }

    return user;
  }

  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }
}