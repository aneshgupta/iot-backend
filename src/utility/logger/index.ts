import { configure, getLogger, addLayout, Logger } from 'log4js';
import { LogConfig } from '../../interfaces';

export class Log {
    private readonly logConfig: LogConfig;

    constructor(options?: { logConfig: LogConfig }) {
        this.logConfig = options?.logConfig as LogConfig;
    }

    public configureLogger = () => {
        // add custom layout
        addLayout('json', (config) => {
            return (logEvent) => JSON.stringify(logEvent) + config.separator;
        });

        // appenders
        configure({
            appenders: {
                console: { type: 'console', layout: { type: 'colored' } },
                dateFile: {
                    type: 'dateFile',
                    filename: this.logConfig.path.debugLogs,
                    layout: {
                        type: 'colored',
                    },
                    compress: true,
                    numBackups: 14,
                    keepFileExt: true,
                },
            },
            categories: {
                default: {
                    appenders: ['console', 'dateFile'],
                    level: this.logConfig.level,
                },
            },
        });
    };

    /**
     * getLogger function is used the get the logger component
     */
    public getLogger = (): Logger => {
        // fetch logger and export
        return getLogger();
    };
}

export const logger = getLogger();
