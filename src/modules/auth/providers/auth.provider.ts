import {HttpException, Inject, Injectable} from '@nestjs/common';
import {CreateUserInputDto} from "../dto/create-user-input.dto";
import {UsersModel} from "../../users/models/users.model";
import {Op} from "sequelize";
import {DoubleRecordException} from "../../../exceptions/double-record.exception";
import {LoginUserInputDto} from "../dto/login-user-input.dto";
import {UsersProvider} from "../../users/providers/users.provider";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthProvider {

    constructor(
        @Inject(UsersProvider) private userProvider: UsersProvider,
        @Inject(JwtService) private jwtService: JwtService,
    ) {
    }

    public async createUser(data: CreateUserInputDto): Promise<UsersModel> {
        if (data.password == data.verify_password) {

            const checkUnique = await UsersModel.findOne({
                where: {
                    [Op.or]: [{email: data.email}, {login: data.login}]
                }
            })

            if (checkUnique) throw new DoubleRecordException("Double record user")

            await UsersModel.create({
                login: data.login,
                email: data.email,
                password: data.password,
                verify_password: data.verify_password
            })

            return await this.loginUser({login: data.login, password: data.password})

        } else {
            throw new HttpException({
                status: 403,
                error: "Passwords don't match",
            }, 403)
        }
    }

    public async loginUser(data: LoginUserInputDto): Promise<any> {
        return await this.userProvider.findOne(data);
    }
}
