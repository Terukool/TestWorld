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
        ApiTags(route),
        AddSwaggerPathParamsToControllerRoutes(route)
    )
};

const AddSwaggerPathParamsToControllerRoutes = (controllerRoute: string): MethodDecorator => {
    const controllerPathParamDecorators = getPathParamsDecorators(controllerRoute);

    const getRoutePathParamDecorators = (method: ClassMethod) => {
        const routePath = getRoutePath(method);

        return getPathParamsDecorators(routePath);
    }

    return ApplyDecoratorsOnAllClassMethods(controllerPathParamDecorators, getRoutePathParamDecorators);
};

const getPathParamsDecorators = (route: string): MethodDecorator[] => {
    const pathParams: string[] = getPathParams(route);
    const pathParamDecorators: MethodDecorator[] = pathParams.map((param) => ApiParam({ name: param }));

    return pathParamDecorators;
};

const getRoutePath = (method: ClassMethod): string => {
    const PATH_METADATA_KEY = 'path';

    return Reflect.getOwnMetadata(PATH_METADATA_KEY, method.value);
};

const ApplyDecoratorsOnAllClassMethods = (decorators: MethodDecorator[], getAdditionalDecorators?: (method: ClassMethod) => MethodDecorator[]): MethodDecorator => {
    return (target: DecoratedClass) => {
        const methods = extractClassMethods(target);

        methods.forEach((method: ClassMethod) => {
            const additionalDecorators = getAdditionalDecorators?.(method) ?? [];
            const allDecorators = [...decorators, ...additionalDecorators];

            allDecorators.forEach((decorator) => applyDecoratorOnMethod(method, decorator));
        });
    }
};


const extractClassMethods = (decoratedClass: DecoratedClass): ClassMethod[] => {
    const classDefinition = decoratedClass.prototype;
    const [_ctor, ...classPropertyNames] = Object.getOwnPropertyNames(classDefinition);

    const classMethodsNames = classPropertyNames.filter((propertyName) => {
        const propertyType = typeof classDefinition[propertyName];

        return propertyType === 'function';
    });

    const methods: ClassMethod[] = classMethodsNames.map((methodName) => ({
        parentClass: decoratedClass,
        name: methodName,
        value: classDefinition[methodName]
    }));

    return methods;
};

const applyDecoratorOnMethod = ({ parentClass, name, value }: ClassMethod, decorator: MethodDecorator) => {
    decorator(parentClass, name, { value });
};

const getPathParams = (route: string): string[] => {
    const pathParams: string[] = route.match(/\/:(.*?)(?=\/|$)/g) ?? []; // everything between : and /
    const routeParamNames: string[] = pathParams.map((param) => param.replace('/:', ''));

    return routeParamNames;
};