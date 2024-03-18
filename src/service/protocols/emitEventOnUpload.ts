export interface ProtocolEmitEventOnUpload {
    emitEventOnUpload: (
        params: ProtocolEmitEventOnUpload.Params
    ) => ProtocolEmitEventOnUpload.Response
}

export namespace ProtocolEmitEventOnUpload {
    export type Params = {
        socketId: string
        processed: number
        fileName: string
    }

    export type Response = void
}
