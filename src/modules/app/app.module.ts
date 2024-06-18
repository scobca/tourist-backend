import {Module} from '@nestjs/common';
import {AppController} from './controllers/app.controller';
import {AppProvider} from './providers/app.provider';
import {SequelizeModule} from "@nestjs/sequelize";
import {dbConf} from "../../config/db.conf";

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            ...dbConf,
        })
    ],
    controllers: [AppController],
    providers: [AppProvider],
})
export class AppModule {
}
