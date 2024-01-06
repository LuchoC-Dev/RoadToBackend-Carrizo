const socket = io('/api');

const socketListener = () => {
  serverStatusListen();
};

const serverStatusListen = () => {
  socket.on('serverStatus', (message) => {
    console.log(message);
  });
};

export default socketListener;
