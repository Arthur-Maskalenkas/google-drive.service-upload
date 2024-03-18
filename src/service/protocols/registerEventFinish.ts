export interface ProtocolRegisterEventFinish {
    registerEventFinish: (
        params: ProtocolRegisterEventFinish.Params
    ) => ProtocolRegisterEventFinish.Response
}

export namespace ProtocolRegisterEventFinish {
    export type Params = {
        formFileManager: any
        cbEvent: () => void
    }

    export type Response = void
}
