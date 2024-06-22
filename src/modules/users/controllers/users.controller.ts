import {Body, Controller, HttpCode, Inject, Post} from '@nestjs/common';
import {UsersProvider} from "../providers/users.provider";
import {ResponseStatus} from "../../../config/response-status";
import {LoginUserInputDto} from "../../auth/dto/login-user-input.dto";

@Controller('users')
export class UsersController {
    constructor(@Inject(UsersProvider) private usersProvider: UsersProvider) {}

    @Post('/findOne')
    @HttpCode(ResponseStatus.SUCCESS)
    public async loginUser(@Body() data: LoginUserInputDto){
        return await this.usersProvider.findOne(data);
    }
}
