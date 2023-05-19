/* eslint-disable @typescript-eslint/no-unused-vars */
import { applyDecorators, Controller } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";

interface DecoratedClass {
    prototype: Record<string, unknown>;
}

interface ClassMethod<T = unknown> {
    parentClass: DecoratedClass;
    name: string;
    value: T;
}

export const HeliosController = (route: string) => {
    return applyDecorators(
        Controller(route),
        ApiTags(route)
    )
};