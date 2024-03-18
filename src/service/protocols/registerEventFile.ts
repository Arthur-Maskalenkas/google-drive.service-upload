import stream from 'node:stream'

export interface ProtocolRegisterEventFile {
    registerEventFile: (
        params: ProtocolRegisterEventFile.Params
    ) => ProtocolRegisterEventFile.Response
}

export namespace ProtocolRegisterEventFile {
    export type Params = {
        formFileManager: any
        cbEvent: (
            fieldName: string,
            req: stream.Readable,
            file: {
                filename: string
                encoding: string
                mimeType: string
            }
        ) => void
    }

    export type Response = void
}
