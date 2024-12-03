import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { PatientsModule } from './modules/patients/patients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [
        DoctorsModule,
        PatientsModule,
        UsersModule,
        AuthModule,
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "Pedro",
            password: "1234",
            database: "hospital",
            autoLoadEntities: true,
            synchronize: true,
            logging: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
