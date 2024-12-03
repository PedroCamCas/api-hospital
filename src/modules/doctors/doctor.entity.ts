import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Patient } from '../patients/patient.entity';

@Entity('doctors')
export class Doctor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 100 })
    name: string;

    @Column({ nullable: false, length: 50 })
    specialty: string;

    @OneToMany(() => Patient, pacient => pacient.doctor)
    patients: Patient[];
}