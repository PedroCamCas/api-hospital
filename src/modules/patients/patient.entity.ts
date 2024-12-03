import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Doctor } from '../doctors/doctor.entity';

@Entity('patients')
export class Patient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 100 })
    name: string;

    @Column({ nullable: true })
    age: number;

    @Column({ nullable: true, length: 255 })
    diagnosis: string;

    @Column({ nullable: true })
    id_doctor_fk: number;

    @ManyToOne(() => Doctor, doctor => doctor.patients,{
        onDelete: 'SET NULL',
        nullable: true
    })
    @JoinColumn({ name: 'id_doctor_fk' })
    doctor: Doctor;
}