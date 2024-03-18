import { ProtocolHttpRequest } from '@/presentation/protocols/http'

export interface UsecaseUploadFiles {
    uploadFiles: (
        params: UsecaseUploadFiles.Params
    ) => Promise<UsecaseUploadFiles.Response>
}

export namespace UsecaseUploadFiles {
    export type Params = {
        socketId: string
        headers: any
        cbOnFinishUpload: () => void
        request: ProtocolHttpRequest
    }
    export type Response = void
}
