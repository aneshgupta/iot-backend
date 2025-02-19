import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { Server } from 'socket.io';

import { IOT } from './model';
import schema from './graphql/schema';
import { Log, logger } from './utility/logger';
import { Context } from './interfaces';
import { authHandler } from './middlewares';

// CONFIGURE ENV VARIABLES
dotenv.config();

export let io: Server;
const iot = new IOT(process.env.DB_URI as string);

// CONFIGURE APOLLO SERVER
const startApolloServer = async () => {
    try {
        // CONFIGURE LOGGER
        const log = new Log({
            logConfig: {
                path: { debugLogs: process.env.LOG_PATH as string },
                level: process.env.LOG_LEVEL as string,
            },
        });
        log.configureLogger();

        // CONFIGURE DB CONNECTION
        const result = await iot.createConnection();
        logger.info(result);

        // CONFIGURE EXPRESS APP
        const app = express();

        app.use(cors());
        app.use(express.json());

        // CONFIGURE SERVER
        const httpServer = http.createServer(app);

        // CONFIGURE SOCKET.IO SERVER
        io = new Server(httpServer, {
            cors: {
                origin: '*',
                credentials: false,
            },
        });

        io.on('connection', (socket) => {
            logger.info('client connection with id: ', socket.id);

            socket.on('disconnect', (reason) => {
                logger.error('client disconnected due to ', reason);
            });
        });

        // CONFIGURE APOLLO SERVER
        const server = new ApolloServer<Context>({
            schema,
            includeStacktraceInErrorResponses: false,
            csrfPrevention: false,
        });

        await server.start();

        app.use(
            '/',
            expressMiddleware(server, {
                context: async ({ req }) => {
                    return await authHandler(req);
                },
            }),
        );

        httpServer.listen(process.env.SERVER_PORT, () => {
            const serverUrl = `http://localhost:${process.env.SERVER_PORT}`;

            logger.info(`🚀 Server ready at ${serverUrl}`);
        });

        // START MOCK SENSOR DATA
        require('./mock');
    } catch (error) {
        logger.error('Error in starting server: ', error);
        process.exit(1); // Exit the process with a failure code
    }
};

startApolloServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    process.exit(1);
});

// Graceful shutdown
function gracefulShutdown() {
    logger.info('Shutting down gracefully...');

    // Closing the DB connection
    iot.closeConnection().then(() => {
        process.exit(0);
    });

    // Force shutdown if not closed within a certain time
    setTimeout(() => {
        logger.error('Forcefully shutting down');
        process.exit(1);
    }, 10000); // 10 seconds
}

// Listen for SIGTERM signal
process.on('SIGTERM', gracefulShutdown);

// Handle application termination (SIGINT for Ctrl+C)
process.on('SIGINT', gracefulShutdown);
