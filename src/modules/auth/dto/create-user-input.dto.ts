import {IsString} from "class-validator";

export class CreateUserInputDto {
    @IsString({
        message: 'Credits must be string'
    })
    login: string;

    @IsString({
        message: 'Credits must be string'
    })
    email: string;

    @IsString({
        message: 'Credits must be string'
    })
    password: string;

    @IsString({
        message: 'Credits must be string'
    })
    verify_password: string;
}