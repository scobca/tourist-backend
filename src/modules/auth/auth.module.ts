import {Module} from '@nestjs/common';
import {AuthController} from './controllers/auth.controller';
import {AuthProvider} from './providers/auth.provider';
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModel} from "../users/models/users.model";
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {JwtUtil} from "../../utils/jwt.util";
import {JwtOptionsModule} from "../jwt/jwt.options.module";

@Module({
    imports: [
        SequelizeModule.forFeature([UsersModel]),
        JwtModule.registerAsync({
            useClass: JwtOptionsModule,
        }),
        UsersModule,
    ],
    controllers: [AuthController],
    providers: [AuthProvider, JwtUtil],
    exports: [
        JwtModule.registerAsync({
            useClass: JwtOptionsModule,
        }),
        AuthProvider,
        JwtUtil,
    ]
})
export class AuthModule {
}
