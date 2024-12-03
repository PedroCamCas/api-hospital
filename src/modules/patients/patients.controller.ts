import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { Patient } from './patient.entity';
import { PatientDTO } from './patient.dto';
import { Doctor } from '../doctors/doctor.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('patients')
export class PatientsController {

    constructor(private readonly patientsService: PatientsService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll(){
        const patients = await this.patientsService.findAll();
        return {
            statusCode: HttpStatus.OK,
            message: 'All patients selected.',
            patients
        };
        
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOneById(@Param('id') id: number){
        const patient = await this.patientsService.findOneById(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'One patient selected.',
            patient
        };
        
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() patient: PatientDTO) {
        const newPatient = await this.patientsService.create(patient);
        return {
            statusCode: HttpStatus.OK,
            message: 'Patient created.',
            newPatient
        };
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    async update(@Body() patient: Patient){
        const patientUpdated = await this.patientsService.update(patient);
        return {
            statusCode: HttpStatus.OK,
            message: 'Patient updated.',
            patientUpdated
        };
    }

    @Patch('assingDoctor/:id')
    @UseGuards(JwtAuthGuard)
    async assingDoctor(@Param('id') idPatient: number, @Body() doctor: Doctor){
        const patientUpdated = await this.patientsService.assingDoctor(idPatient, doctor);
        return {
            statusCode: HttpStatus.OK,
            message: 'Patient assinged to a doctor.',
            patientUpdated
        };
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(@Param('id') id: number){
        await this.patientsService.delete(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Patient has deleted.'
        };
    }

}
