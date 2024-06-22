import { Injectable } from '@nestjs/common';
import {UserInputDto} from "../dto/user-input.dto";
import {UsersModel} from "../models/users.model";
import {Op} from "sequelize";
import {UserOutputDto} from "../dto/user-output.dto";
import {ContentNotExistException} from "../../../exceptions/content-not-exist.exception";

@Injectable()
export class UsersProvider {

    public async findOne(data: UserInputDto) {
        return await UsersModel.findOne({
            where: {
                [Op.and]: [{login: data.login}, {password: data.password}]
            }
        }).then((res: UserOutputDto | null) => {
            if (res) {
                return res
            } else {
                throw new ContentNotExistException("User with this data not exist")
            }
        })
    }
}
