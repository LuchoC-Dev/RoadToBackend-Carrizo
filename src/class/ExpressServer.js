import express from 'express';

class ExpressServer {
  constructor(PORT, listenCallback) {
    this.port = PORT;
    this.expressInit(listenCallback);
  }

  expressInit(listenCallback) {
    this.app = express();
    this.appListen = this.app.listen(this.port, listenCallback);
    this._securityOptionsInit();
  }
  _securityOptionsInit() {
    this.appUse(express.json());
    this.appUse(express.urlencoded({ extended: true }));
  }

  appUse(value) {
    this.app.use(value);
  }

  appSet(key, value) {
    this.app.set(key, value);
  }

  addRoute(router) {
    this.app.use('/', router);
  }
}

export default ExpressServer;
