import {HttpException} from "@nestjs/common";
import {ResponseStatus} from "../config/response-status";

export class ContentNotExistException<T> extends HttpException {
    constructor(message: T) {
        super({message}, ResponseStatus.CONTENT_NOT_EXIST);
    }
}