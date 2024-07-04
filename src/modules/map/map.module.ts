import {Module} from "@nestjs/common";
import {MapController} from "./controllers/map.controller";
import {MapProvider} from "./providers/map.provider";
import {HttpModule} from "@nestjs/axios";

@Module({
    imports: [HttpModule],
    controllers: [MapController],
    providers: [MapProvider],
    exports: [MapProvider],

})
export class MapModule {}