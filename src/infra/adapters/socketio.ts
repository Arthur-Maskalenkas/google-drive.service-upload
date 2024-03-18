import { Server } from 'socket.io'
import { ProtocolEmitEventOnUpload } from '../../service/protocols/emitEventOnUpload'

export class AdapterSocketIo implements ProtocolEmitEventOnUpload {
    constructor(private readonly socketIoServer: Server) {}
    public emitEventOnUpload({
        socketId,
        fileName,
        processed,
    }: ProtocolEmitEventOnUpload.Params): ProtocolEmitEventOnUpload.Response {
        this.socketIoServer.to(socketId).emit('file-upload', {
            processed,
            fileName,
        })
    }

    get io() {
        return this.socketIoServer
    }
}
