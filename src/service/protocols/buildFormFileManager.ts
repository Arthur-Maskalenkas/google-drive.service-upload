export interface ProtocolBuildFormFileManager {
    buildFormFileManager: (
        params: ProtocolBuildFormFileManager.Params
    ) => ProtocolBuildFormFileManager.Response
}

export namespace ProtocolBuildFormFileManager {
    export type Params = {
        headers: any
    }

    export type Response = any
}
