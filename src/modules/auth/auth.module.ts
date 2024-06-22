import {Module} from '@nestjs/common';
import {AuthController} from './controllers/auth.controller';
import {AuthProvider} from './providers/auth.provider';
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModel} from "../users/models/users.model";
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [
        SequelizeModule.forFeature([UsersModel]),
        UsersModule,
        JwtModule,
    ],
    controllers: [AuthController],
    providers: [AuthProvider],
})
export class AuthModule {
}
