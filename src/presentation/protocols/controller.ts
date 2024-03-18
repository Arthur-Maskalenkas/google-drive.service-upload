import {
    ProtocolHttpRequest,
    ProtocolHttpResponse,
} from '@/presentation/protocols/http'

export interface ProtocolController {
    handle: (
        req: ProtocolHttpRequest,
        res: ProtocolHttpResponse
    ) => Promise<ProtocolHttpResponse | void>
}
