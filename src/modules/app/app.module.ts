import {Module} from '@nestjs/common';
import {AppController} from './controllers/app.controller';
import {AppProvider} from './providers/app.provider';
import {SequelizeModule} from "@nestjs/sequelize";
import {dbConf} from "../../config/db.conf";
import {AuthModule} from "../auth/auth.module";
import {UsersModule} from "../users/users.module";
import {MapModule} from "../map/map.module";

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            ...dbConf,
            synchronize: true,
        }),
        AuthModule,
        UsersModule,
        MapModule,
    ],
    controllers: [AppController],
    providers: [AppProvider],
})
export class AppModule {
}
