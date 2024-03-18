import stream from 'node:stream'

export interface ProtocolUploadFile {
    uploadFile: (
        params: ProtocolUploadFile.Params
    ) => ProtocolUploadFile.Response
}

export namespace ProtocolUploadFile {
    export type Params = {
        fileName: string
    }

    export type Response = stream.Writable
}
