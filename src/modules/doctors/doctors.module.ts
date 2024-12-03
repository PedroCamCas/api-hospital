import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './doctor.entity';

@Module({
  providers: [DoctorsService],
  controllers: [DoctorsController],
  imports: [TypeOrmModule.forFeature([Doctor])],
})
export class DoctorsModule {}
