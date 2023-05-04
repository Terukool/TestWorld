import core from "@nestia/core";
import { Controller } from "@nestjs/common";

@Controller("healstsh")
export class IsAliveController {
    @core.TypedRoute.Get("isAlive")
    public isAlivesss(): boolean {
        return true;
    }
}
