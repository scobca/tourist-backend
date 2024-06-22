import {HttpException} from "@nestjs/common";
import {ResponseStatus} from "../config/response-status";

export class DoubleRecordException<T> extends HttpException {
    constructor(message: T) {
        super({ message }, ResponseStatus.DOUBLE_RECORD);
    }
}