import { UsecaseUploadFiles } from '@/domain/usecases/usecaseUploadFiles'
import { ProtocolController } from '@/presentation/protocols/controller'
import {
    ProtocolHttpRequest,
    ProtocolHttpResponse,
} from '@/presentation/protocols/http'

export class ControllerUploadFile implements ProtocolController {
    constructor(private readonly usecaseUploadFiles: UsecaseUploadFiles) {}
    public async handle(
        request: ProtocolHttpRequest,
        response: ProtocolHttpResponse
    ): Promise<void> {
        try {
            await this.usecaseUploadFiles.uploadFiles({
                headers: request.headers,
                request,
                socketId: request.socketId,
                cbOnFinishUpload: () => {
                    response.writeHead(200)
                    const data = JSON.stringify({
                        result: 'Files uploaded with success!',
                    })
                    response.end(data)
                },
            })
        } catch (error) {
            response.writeHead(500)
            const data = JSON.stringify({
                result: 'Internal Server Error',
            })
            response.end(data)
            console.error(error)
        }
    }
}
