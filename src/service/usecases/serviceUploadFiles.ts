import { UsecaseUploadFiles } from '@/domain/usecases/usecaseUploadFiles'
import { logger } from '@/infra/logger/pino'
import stream from 'node:stream'
import { pipeline } from 'stream/promises'
import { ProtocolBuildFormFileManager } from '../protocols/buildFormFileManager'
import { ProtocolEmitEventOnUpload } from '../protocols/emitEventOnUpload'
import { ProtocolRegisterEventFile } from '../protocols/registerEventFile'
import { ProtocolRegisterEventFinish } from '../protocols/registerEventFinish'
import { ProtocolUploadFile } from '../protocols/uploadFile'

type ProcessFiles = {
    fileName: string
    socketId: string
}
export class ServiceUploadFiles implements UsecaseUploadFiles {
    constructor(
        private readonly protocolBuildFormFileManager: ProtocolBuildFormFileManager,
        private readonly protocolRegisterEventFile: ProtocolRegisterEventFile,
        private readonly protocolRegisterEventFinish: ProtocolRegisterEventFinish,
        private readonly protocolUploadFile: ProtocolUploadFile,
        private readonly protocolEmitEventOnUpload: ProtocolEmitEventOnUpload
    ) {}

    private processFile({ fileName, socketId }: ProcessFiles) {
        let lastMessageSent = Date.now()

        async function* handleData(source: AsyncIterable<Buffer>) {
            let processed = 0
            for await (const chunk of source) {
                yield chunk
                processed += chunk.length

                const now = Date.now()
                const timeElapsed = now - lastMessageSent
                const canExecute = timeElapsed >= 200

                if (!canExecute) continue

                lastMessageSent = now

                // @ts-ignore
                this.protocolEmitEventOnUpload.emitEventOnUpload({
                    fileName,
                    processed,
                    socketId,
                })
                logger.info(
                    `[${fileName}] - Processed: ${processed} bytes on ${socketId}`
                )
            }
        }
        return handleData.bind(this)
    }
    public async uploadFiles(
        params: UsecaseUploadFiles.Params
    ): Promise<UsecaseUploadFiles.Response> {
        const formFileManager =
            this.protocolBuildFormFileManager.buildFormFileManager({
                headers: params.headers,
            })

        this.protocolRegisterEventFile.registerEventFile({
            formFileManager,
            cbEvent: async (
                fieldName: string,
                req: stream.Readable,
                file: {
                    filename: string
                    encoding: string
                    mimeType: string
                }
            ) => {
                await pipeline(
                    req,
                    this.processFile({
                        fileName: file.filename,
                        socketId: params.socketId,
                    }),
                    this.protocolUploadFile.uploadFile({
                        fileName: file.filename,
                    })
                )
            },
        })

        this.protocolRegisterEventFinish.registerEventFinish({
            formFileManager,
            cbEvent: params.cbOnFinishUpload,
        })

        await pipeline(params.request, formFileManager)
    }
}
