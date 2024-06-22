import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersProvider } from './providers/users.provider';
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModel} from "./models/users.model";

@Module({
  imports: [SequelizeModule.forFeature([UsersModel])],
  controllers: [UsersController],
  providers: [UsersProvider],
  exports: [UsersProvider],

})
export class UsersModule {}
