import {Body, Controller, HttpCode, Inject, Post} from '@nestjs/common';
import {AuthProvider} from "../providers/auth.provider";
import {CreateUserInputDto} from "../dto/create-user-input.dto";
import {ResponseStatus} from "../../../config/response-status";
import {LoginUserInputDto} from "../dto/login-user-input.dto";

@Controller('auth')
export class AuthController {
    constructor(@Inject(AuthProvider) private authProvider: AuthProvider) {
    }

    @Post('/createUser')
    @HttpCode(ResponseStatus.SUCCESS)
    async createUser(@Body() data: CreateUserInputDto) {
        return await this.authProvider.createUser(data);
    }

    @Post('/loginUser')
    @HttpCode(ResponseStatus.SUCCESS)
    async loginUser(@Body() data: LoginUserInputDto){
        return await this.authProvider.loginUser(data);
    }
}
