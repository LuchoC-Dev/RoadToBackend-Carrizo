import { Server } from 'socket.io';

class SocketIo {
  constructor(path, httpServer) {
    this.path = path;
    this.httpServer = httpServer;
  }

  init() {
    this.io = new Server(this.httpServer).of(this.path);
    this.ioConnect();
  }

  ioConnect() {
    this.io.on('connection', (socket) => this.connectionCallback(socket));
  }

  async connectionCallback(socket) {
    console.log(`Nuevo cliente conectado: ${socket.id}`);
  }
}

export default SocketIo;
