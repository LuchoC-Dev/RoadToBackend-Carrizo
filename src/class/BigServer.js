//  Basics imports
import express from 'express';
import ExpressServer from './ExpressServer.js';
import { useHandlebars } from './Implements.js';
import SocketApi from '../sockets/SocketApi.js';
import apiRouter from '../routes/api/api.routes.js';
import Database from './Database.js';

class BigServer extends ExpressServer {
  constructor({ port, publicPath, hbsViewsPath, dbUrl, listenCallback }) {
    super({ port, listenCallback });
    this.publicPath = publicPath;
    this.hbsViewsPath = hbsViewsPath;
    this.dbUrl = dbUrl;
  }
  async init() {
    this._setPublic();
    this._handlebarsInit();
    this._routesInit();
    await this._dbInit();
    this._socketInit();
  }

  _setPublic() {
    this.appUse(express.static(this.publicPath));
  }

  _handlebarsInit() {
    useHandlebars(this.app, this.hbsViewsPath);
  }

  _routesInit() {
    this.addRoute(apiRouter);
  }

  async _dbInit() {
    this.db = new Database(this.dbUrl);
    await this.db.init();
  }

  _socketInit() {
    this.sockets = {};
    this._socketApiInit('/api');
  }

  _socketApiInit(path) {
    try {
      const socketName = 'api';
      if (this.sockets[socketName]) {
        throw new Error(
          `Error initializing the socket with the name "${socketName}". A socket with that name already exists.`,
        );
      }
      const socket = new SocketApi(path, this.appListen);
      socket.run();
      this.sockets[socketName] = socket;
      console.log(`Successful initialization with ${socketName} socket`);
    } catch (error) {
      console.error(error);
    }
  }
}

export default BigServer;
