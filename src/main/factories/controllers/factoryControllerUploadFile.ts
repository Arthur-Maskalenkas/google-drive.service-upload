import { AdapterBusBoy } from '@/infra/adapters/busboy'
import { AdapterSocketIo } from '@/infra/adapters/socketio'
import { RepositoryNodejs } from '@/infra/repositories/nodejs'
import { ControllerUploadFile } from '@/presentation/controllers/controllerUploadFile'
import { ServiceUploadFiles } from '../../../service/usecases/serviceUploadFiles'

export const factoryControllerUploadFile = (
    adapterSocketIo: AdapterSocketIo
) => {
    const adapterBusBoy = new AdapterBusBoy()
    const repositoryNodeJs = new RepositoryNodejs()

    const usecaseUploadFiles = new ServiceUploadFiles(
        adapterBusBoy,
        adapterBusBoy,
        adapterBusBoy,
        repositoryNodeJs,
        adapterSocketIo
    )

    return new ControllerUploadFile(usecaseUploadFiles)
}
