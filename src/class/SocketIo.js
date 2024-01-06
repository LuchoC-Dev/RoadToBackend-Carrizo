import { Server } from 'socket.io';

class SocketIo {
  constructor(path, httpServer) {
    this.path = path;
    this.httpServer = httpServer;
  }

  init() {
    this.io = new Server(this.httpServer).of(this.path);
  }

  newOn(eventName, eventcallback) {
    this.io.on(eventName, eventcallback);
  }

  newEmit(socket, eventName, message) {
    socket.emit(eventName, message);
  }
}

export default SocketIo;
