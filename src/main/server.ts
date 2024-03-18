import { AdapterSocketIo } from '@/infra/adapters/socketio'
import { factoryControllerUploadFile } from '@/main/factories/controllers/factoryControllerUploadFile'
import Routes from '@/main/factories/routes/routes'
import * as fs from 'fs'
import https from 'https'
import { Server } from 'socket.io'

const PORT = process.env.PORT || 3000

const localHostSSL = {
    key: fs.readFileSync('./certificates/server.key'),
    cert: fs.readFileSync('./certificates/server.crt'),
}

const routes = new Routes()
const server = https.createServer(localHostSSL, routes.handler.bind(routes))
const socketIoServer = new AdapterSocketIo(
    new Server(server, {
        cors: {
            origin: '*',
            credentials: false,
        },
    })
)

const controllerUploadFiles = factoryControllerUploadFile(socketIoServer)
routes.setControllerUploadFiles(controllerUploadFiles)
socketIoServer.io.on('connection', (socket) =>
    console.info(`someone connected: ${socket.id}`)
)
const startServer = () => {
    const { address, port } = server.address() as any
    console.info(`app running at https://${address}:${port}`)
}

server.listen(PORT, startServer)
