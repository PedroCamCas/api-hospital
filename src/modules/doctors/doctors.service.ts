import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
import { DoctorDTO } from './doctor.dto';

@Injectable()
export class DoctorsService {

    constructor(
        @InjectRepository(Doctor)
        private readonly doctorRepository: Repository<Doctor>,
      ) {}

    // Gets de doctores
    async findAll(): Promise<Doctor[]> {
        return await this.doctorRepository.find();
    }

    async findOneById(id: number){
        const doctor = await this.doctorRepository.findOne({
            where: { id } 
        });
        if (!doctor) {
            throw new NotFoundException(`Doctor with id: ${id} not found.`);
        }
        return doctor;
    }

    async findAllPatients(id: number){

        const doctor = await this.doctorRepository.findOne({
            where: { id },
            relations: ['patients']
        });
        if (!doctor) {
            throw new NotFoundException(`Doctor with id: ${id} not found.`);
        }
        return doctor;
    }

    // Post de doctor
    async create(doctor: DoctorDTO){
        if (!doctor.name || !doctor.specialty) {
            throw new BadRequestException('The name and specialty of doctor is obligatory.');
        }
        await this.doctorRepository.create(doctor);
        return await this.doctorRepository.save(doctor);
    }

    // Put de doctor
    async update(doctor: Doctor){
        if (!doctor.id) {
            throw new BadRequestException('The ID of doctor is obligatory.');
        }
        if (!doctor.name && !doctor.specialty) {
            throw new BadRequestException('The name or specialty of doctor is obligatory.');
        }
        await this.doctorRepository.update(doctor.id, doctor);
        return await this.doctorRepository.save(doctor);
    }

    // Delete de doctor
    async delete(id: number) : Promise<void> {
        const doctor = await this.doctorRepository.findOne({ where: { id } });
        if (!doctor) {
            throw new NotFoundException(`Doctor with id ${id} not found.`);
        }
        await this.doctorRepository.remove(doctor);
    }

}
