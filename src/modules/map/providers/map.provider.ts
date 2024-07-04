import {Inject, Injectable} from "@nestjs/common";
import {CreateRouteDto} from "../dto/create-route.dto";
import {HttpService} from "@nestjs/axios";
import {mapConf} from "../../../config/map.conf";
import {CreateRouteOutputDto} from "../dto/create-route-output.dto";

@Injectable()
export class MapProvider {

    constructor(@Inject(HttpService) private httpService: HttpService) {
    }

    public async createRoute(data: CreateRouteDto) {
        const url: string = `${mapConf.endpoint}?from=${data.from}&to=${data.to}&ratio=${data.ratio || 1}&locate=${data.locate || 'ru'}`
        const res: any = await this.httpService.get(url).toPromise()

        console.log(res)
        const route: CreateRouteOutputDto = {
            status: res.status,
            distance: res.data.body.distanceInMeters,
            sightsCount: res.data.body.sightsCount,
            shareURL: res.data.body.shareURL,
        }

        return route
    }
}