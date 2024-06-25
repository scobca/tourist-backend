import {HttpException, Inject, Injectable} from '@nestjs/common';
import {CreateUserInputDto} from "../dto/create-user-input.dto";
import {UsersModel} from "../../users/models/users.model";
import {Op} from "sequelize";
import {DoubleRecordException} from "../../../exceptions/double-record.exception";
import {LoginUserInputDto} from "../dto/login-user-input.dto";
import {UsersProvider} from "../../users/providers/users.provider";
import {JwtUtil} from "../../../utils/jwt.util";
import {JwtUserSignInDto} from "../dto/jwt-user-sign-in.dto";
import {ContentNotExistException} from "../../../exceptions/content-not-exist.exception";

@Injectable()
export class AuthProvider {

    constructor(
        @Inject(UsersProvider) private userProvider: UsersProvider,
        @Inject(JwtUtil) private jwt: JwtUtil,
    ) {}

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
        const user = await this.userProvider.getUser(data);

        if (user != null) {
            const data: JwtUserSignInDto = {
                id: (await user).id,
                login: (await user).login,
                email: (await user).email,
                password: (await user).password
            };

            return {
                token: await this.jwt.signIn(data),
                user: user,
            }
        } else {
            throw new ContentNotExistException("User with this data not exist")
        }
    }
}
