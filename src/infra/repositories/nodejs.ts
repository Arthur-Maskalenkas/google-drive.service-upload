import * as fs from 'fs'
import { ProtocolUploadFile } from '../../service/protocols/uploadFile'

export class RepositoryNodejs implements ProtocolUploadFile {
    constructor(private readonly downloadDir: string = 'downloads') {}
    public uploadFile(
        params: ProtocolUploadFile.Params
    ): ProtocolUploadFile.Response {
        return fs.createWriteStream(`${this.downloadDir}/${params.fileName}`)
    }
}
