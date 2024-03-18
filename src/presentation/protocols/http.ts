import * as http from 'http'

export type ProtocolHttpResponse = http.ServerResponse

export type ProtocolHttpRequest = {
    body?: any
    headers?: any
    params?: any
    socketId?: string
} & http.IncomingMessage
