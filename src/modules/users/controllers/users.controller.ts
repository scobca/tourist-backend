import {Body, Controller, Delete, Get, HttpCode, Inject, Post} from '@nestjs/common';
import {UsersProvider} from "../providers/users.provider";
import {ResponseStatus} from "../../../config/response-status";
import {LoginUserInputDto} from "../../auth/dto/login-user-input.dto";
import {UserDataDto} from "../dto/user-data.dto";

@Controller('users')
export class UsersController {
    constructor(@Inject(UsersProvider) private usersProvider: UsersProvider) {}

    @Post('/getUser')
    @HttpCode(ResponseStatus.SUCCESS)
    public async loginUser(@Body() data: LoginUserInputDto){
        return await this.usersProvider.getUser(data);
    }

    @Post('/getByID')
    @HttpCode(ResponseStatus.SUCCESS)
    public async getUserByID(@Body() data: UserDataDto){
        return await this.usersProvider.findByID(data.id);
    }

    @Get('/getAll')
    @HttpCode(ResponseStatus.SUCCESS)
    public async getALl(){
        return await this.usersProvider.getAll();
    }

    @Delete('/deleteByID')
    @HttpCode(ResponseStatus.SUCCESS)
    public async deleteUserByID(@Body() data: UserDataDto){
        return await this.usersProvider.deleteByID(data.id);
    }
}
