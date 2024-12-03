import { Controller, Get, Post, Param, Body, Res, HttpStatus, Put, Delete, UseGuards } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { Doctor } from './doctor.entity';
import { DoctorDTO } from './doctor.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('doctors')
export class DoctorsController {

    constructor(private readonly doctorsService: DoctorsService) {}

    @Get()
    async findAll(){
        const doctors = await this.doctorsService.findAll();
        return {
            statusCode: HttpStatus.OK,
            message: 'All doctors selected.',
            doctors
        };
        
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOneById(@Param('id') id: number){
        const doctor = await this.doctorsService.findOneById(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'One doctor selected.',
            doctor
        };
        
    }

    @Get('details/:id')
    @UseGuards(JwtAuthGuard)
    async findAllPatients(@Param('id') id: number){
        const doctorWithPatients = await this.doctorsService.findAllPatients(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'All patients of doctor selected.',
            doctorWithPatients
        };
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() doctor: DoctorDTO) {
        const newDoctor = await this.doctorsService.create(doctor);
        return {
            statusCode: HttpStatus.OK,
            message: 'Doctor created.',
            newDoctor
        };
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    async update(@Body() doctor: Doctor){
        const doctorUpdated = await this.doctorsService.update(doctor);
        return {
            statusCode: HttpStatus.OK,
            message: 'Doctor updated.',
            doctorUpdated
        };
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(@Param('id') id: number){
        await this.doctorsService.delete(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Doctor has deleted.'
        };
    }

}
