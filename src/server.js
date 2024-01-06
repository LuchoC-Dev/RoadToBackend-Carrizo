//  Basics imports
import express from 'express';

// Utils imports
import { PORT, APP_URL } from './utils/env.js';
import { __dirProyecto } from './utils/dirnames.js';

// Class imports
import Database from './class/Database.js';

class MyServer {
  constructor() {
    this.PORT = PORT;
    this.app = express();
    this.appListen = this.app.listen(this.PORT, this.appListenCallback);
  }

  appListenCallback() {
    console.log(`Sevidor iniciado en: ${APP_URL}`);
  }

  async init() {
    this.middlewaresInit();
    await this.initDB();
  }

  middlewaresInit() {
    this.middlewaresSecurityInit();
    this.publicLinkInit();
  }

  middlewaresSecurityInit() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  publicLinkInit() {
    this.app.use(express.static(`${__dirProyecto}/public`));
  }

  async initDB() {
    this.db = await new Database(this.appListen).init();
  }
}

const myServer = new MyServer().init();

/*
const app = express();
const httpServer = app.listen(PORT, () => {
  console.log(`Sevidor iniciado en: ${APP_URL}`);
});

const initDB = async (httpServer) => {
  return new Database(httpServer).init();
};

const db = initDB(httpServer);
*/
