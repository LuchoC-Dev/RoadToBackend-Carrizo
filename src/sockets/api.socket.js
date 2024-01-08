import Socket from '../class/Socket.js';

let apiSocket;

const apiSocketInit = (appListener) => {
  apiSocket = new Socket('/api', appListener);
  apiSocket.init();
  apiSocketRun();
};

const apiSocketRun = () => {
  apiSocket.newOn('connection', (socket) => {
    welcomeMessage(socket);
  });
};

const welcomeMessage = (socket) => {
  console.log('Successful connection with client | ID: ' + socket.id);
  apiSocket.newEmit(socket, 'serverStatus', 'hi');
};

export { apiSocketInit };
