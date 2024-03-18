import { ProtocolController } from '@/presentation/protocols/controller'
import {
    ProtocolHttpRequest,
    ProtocolHttpResponse,
} from '@/presentation/protocols/http'
import { parse } from 'url'

export default class Routes {
    private controllerUploadFiles: ProtocolController
    async uploadFiles(
        request: ProtocolHttpRequest,
        response: ProtocolHttpResponse
    ) {
        await this.controllerUploadFiles.handle(request, response)
    }

    public setControllerUploadFiles(controller: ProtocolController) {
        this.controllerUploadFiles = controller
    }

    handler(request: ProtocolHttpRequest, response: ProtocolHttpResponse) {
        response.setHeader('Access-Control-Allow-Origin', '*')
        const chosen = this.uploadFiles

        if (request.method !== 'POST') {
            console.log('metodo invalido')
            return
        }

        const {
            query: { socketId },
        } = parse(request.url, true)

        Reflect.set(request, 'socketId', socketId as string)
        return chosen.apply(this, [request, response])
    }
}
