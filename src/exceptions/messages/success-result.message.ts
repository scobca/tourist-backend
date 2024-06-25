import {HttpException} from "@nestjs/common";
import {ResponseStatus} from "../../config/response-status";

export class SuccessResultMessage<T> extends HttpException {
    constructor(message: T) {
        super({message}, ResponseStatus.SUCCESS);
    }
}