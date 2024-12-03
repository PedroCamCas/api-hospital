import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { Patient } from './patient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [PatientsService],
  controllers: [PatientsController],
  imports: [TypeOrmModule.forFeature([Patient])],
})
export class PatientsModule {}
