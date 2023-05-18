import { ConfigEnv, defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import tsconfigPaths from 'vite-tsconfig-paths';
import legacy from '@vitejs/plugin-legacy';
import babel from 'vite-plugin-babel';

export default defineConfig(({ command, mode }: ConfigEnv) => {
    return {
        build: {
            target: 'chrome69',
        },
        define: {
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        },
        optimizeDeps: {
            // Vite does not work well with optional dependencies, mark them as ignored for now
            exclude: [
                '@nestjs/platform-socket.io',
                '@nestjs/websockets',
                '@nestjs/microservices',
                'amqp-connection-manager',
                'amqplib',
                'nats',
                '@grpc/proto-loader',
                '@grpc/grpc-js',
                'redis',
                'kafkajs',
                'mqtt',
                'cache-manager',
                '@nestjs/microservices',
                '@nestjs/websockets',
                '@nestjs/swagger',
                'cache-manager',
                'class-transformer',
                'class-validator',
                'fastify-swagger',
            ],
            include: [
                'swagger-ui-dist',
            ]
        },
        plugins: [
            tsconfigPaths(),
            ...VitePluginNode({
                adapter: 'nest',
                appPath: './src/main.ts',
                tsCompiler: 'swc',
            }),
            legacy({
                targets: "chrome > 60",
            }),
            // babel({
            //     babelConfig: {
            //         targets: "chrome > 60"
            //     }s
            // })
        ],
    };
});