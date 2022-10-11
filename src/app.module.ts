import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';

const { MONGO_URL, MONGO_USER, MONGO_PASS, MONGO_DB } = process.env;

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        MongooseModule.forRoot(
            MONGO_URL,
            {
                user: MONGO_USER,
                pass: MONGO_PASS,
                dbName: MONGO_DB
            }
        ),
        UsersModule,
        RolesModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}