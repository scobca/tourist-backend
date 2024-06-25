import {Injectable} from '@nestjs/common';
import {UserInputDto} from "../dto/user-input.dto";
import {UsersModel} from "../models/users.model";
import {Op} from "sequelize";
import {UserOutputDto} from "../dto/user-output.dto";
import {ContentNotExistException} from "../../../exceptions/content-not-exist.exception";
import {SuccessResultMessage} from "../../../exceptions/messages/success-result.message";

@Injectable()
export class UsersProvider {

    public async getUser(data: UserInputDto) {
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

    public async findByID(id: number) {
        return await UsersModel.findOne({
            where: {
                id: id,
            }
        }).then((res: UserOutputDto | null) => {
            console.log(res)
            if (res != null) {
                return {
                    id: res.id,
                    login: res.login,
                    email: res.email,
                }
            } else {
                throw new ContentNotExistException('User with this ID not exist')
            }
        })
    }

    public async getAll() {
        return UsersModel.findAll();
    }

    public async deleteByID(id: number){
        const user = await this.findByID(id);

        if (user != null) {
            await UsersModel.destroy({
                where: {
                    id: id,
                }
            })

            throw new SuccessResultMessage("The user has been deleted.")
        } else {
            throw new ContentNotExistException("User with this ID not exist")
        }
    }
}
