import Socket from './Socket.js';

class SocketApi {
  constructor(path, httpServer) {
    this.socket = new Socket(path, httpServer);
    this.socket.init();
  }

  run() {
    this.socket.newOn('connection', (socketClient) => {
      this._connectionCallback(socketClient);
    });
  }

  _connectionCallback(socketClient) {
    this._welcomeMessage(socketClient);
  }

  _welcomeMessage(socketClient) {
    console.log('Successful connection with client | ID: ' + socketClient.id);
    this.socket.newEmit(socketClient, 'serverStatus', 'hi');
  }
}

export default SocketApi;
