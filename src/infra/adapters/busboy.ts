import busboy from 'busboy'
import { ProtocolBuildFormFileManager } from '../../service/protocols/buildFormFileManager'
import { ProtocolRegisterEventFile } from '../../service/protocols/registerEventFile'
import { ProtocolRegisterEventFinish } from '../../service/protocols/registerEventFinish'

export class AdapterBusBoy
    implements
        ProtocolBuildFormFileManager,
        ProtocolRegisterEventFile,
        ProtocolRegisterEventFinish
{
    buildFormFileManager(
        props: ProtocolBuildFormFileManager.Params
    ): ProtocolBuildFormFileManager.Response {
        return busboy({ headers: props.headers })
    }

    registerEventFile({
        formFileManager,
        cbEvent,
    }: ProtocolRegisterEventFile.Params): ProtocolRegisterEventFile.Response {
        formFileManager.on('file', cbEvent)
    }

    registerEventFinish({
        formFileManager,
        cbEvent,
    }: ProtocolRegisterEventFinish.Params): ProtocolRegisterEventFinish.Response {
        formFileManager.on('finish', cbEvent)
    }
}
