//  Basics imports
import express from 'express';
import ExpressServer from './ExpressServer.js';
import { useHandlebars } from './Implements.js';
import SocketApi from './SocketApi.js';
import apiRouter from '../routes/api/api.routes.js';
import Database from './Database.js';

class BigServer extends ExpressServer {
  constructor(PORT, listenCallback, publicPath, hbsViewsPath, DB_URL) {
    super(PORT, listenCallback);
    this.publicPath = publicPath;
    this.hbsViewsPath = hbsViewsPath;
    this.db_url = DB_URL;
  }
  async init() {
    this.appUse(express.static(this.publicPath));
    useHandlebars(this.app, this.hbsViewsPath);
    await this._dbInit();
    this._socketInit();
    this._routesInit();
  }

  async _dbInit() {
    this.db = new Database(this.db_url);
    await this.db.init();
  }

  _socketInit() {
    this.sockets = {};
    this._socketApiInit('/api');
  }

  _socketApiInit(path) {
    const socket = new SocketApi(path, this.appListen);
    socket.run();
    this.sockets['api'] = socket;
  }

  _routesInit() {
    this.addRoute(apiRouter);
  }
}

export default BigServer;
