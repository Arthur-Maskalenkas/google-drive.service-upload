import pino from 'pino'

const logger = pino({
    prettyPrint: {
        ignore: 'pid,hostname',
        colorize: true,
        translateTime: 'SYS:dd-mm-yyyy HH:MM:ss.l',
    },
})
export { logger }
