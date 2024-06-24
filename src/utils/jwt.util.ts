import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {JwtUserSignInDto} from "../modules/auth/dto/jwt-user-sign-in.dto";
import {TokenTypeEnum} from "./token.type.enum";

@Injectable()
export class JwtUtil {
    constructor(private jwtService: JwtService) {}

    public signIn(data: JwtUserSignInDto) {
        return this.jwtService.signAsync({
            sub: data.id,
            username: data.login,
            tokenType: TokenTypeEnum.USER,
        })
    }
}