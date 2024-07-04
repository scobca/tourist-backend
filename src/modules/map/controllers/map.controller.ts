import {Body, Controller, HttpCode, Inject, Post} from "@nestjs/common";
import {MapProvider} from "../providers/map.provider";
import {CreateRouteDto} from "../dto/create-route.dto";

@Controller('map')
export class MapController {
    constructor(@Inject(MapProvider) private mapProvider: MapProvider) {}

    @Post('createRoute')
    @HttpCode(200)
    public async createRoute(@Body() data: CreateRouteDto) {
        return await this.mapProvider.createRoute(data);
    }

}