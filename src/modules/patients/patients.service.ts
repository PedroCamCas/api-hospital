import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Patient } from './patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientDTO } from './patient.dto';
import { Doctor } from '../doctors/doctor.entity';

@Injectable()
export class PatientsService {

    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
      ) {}

    // Selects de pacientes
    async findAll(): Promise<Patient[]> {
        return await this.patientRepository.find();
    }

    async findOneById(id: number){
        const patient = await this.patientRepository.findOne({
            where: { id } 
        });
        if (!patient) {
            throw new NotFoundException(`Patient with id: ${id} not found.`);
        }
        return patient;
    }

    // Post de paciente
    async create(patient: PatientDTO){
        if (!patient.name) {
            throw new BadRequestException('The name of patient is obligatory.');
        }
        await this.patientRepository.create(patient);
        return await this.patientRepository.save(patient);
    }

    // Put de paciente
    async update(patient: Patient){
        if (!patient.id) {
            throw new BadRequestException('The ID of patient is obligatory.');
        }
        if (!patient.name) {
            throw new BadRequestException('The name of patient is obligatory.');
        }
        await this.patientRepository.update(patient.id, patient);
        return await this.patientRepository.save(patient);
    }

    // Patch de paciente
    async assingDoctor(idPatient: number, doctor: Doctor){
        if (!idPatient) {
            throw new BadRequestException('The ID of patient is obligatory.');
        }
        if (!doctor) {
            throw new BadRequestException('The doctor has not been found.');
        }

        const patient = await this.findOneById(idPatient);
        patient.doctor = doctor;
        patient.id_doctor_fk = doctor.id;
        await this.patientRepository.update(idPatient, patient);
        return await this.patientRepository.save(patient);
    }

    // Delete de paciente
    async delete(id: number) : Promise<void> {
        const patient = await this.patientRepository.findOne({ where: { id } });
        if (!patient) {
            throw new NotFoundException(`Patient with id ${id} not found.`);
        }
        await this.patientRepository.remove(patient);
    }

}
