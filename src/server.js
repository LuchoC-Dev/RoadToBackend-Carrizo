//  Basics imports
import express from 'express';
import handlebars from 'express-handlebars';
import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';

// Utils imports
import { PORT, APP_URL, DB_URL } from './utils/env.js';
import { __dirProyecto, __dirSrc } from './utils/dirnames.js';

// Class imports
import Database from './class/Database.js';
import apiRouter from './routes/api/api.routes.js';
import { apiSocketInit } from './sockets/api.socket.js';

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
    this.handlebarsInit();
    await this.databaseInit();
    this.socketsInit();
    this.routesInit();
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

  handlebarsInit() {
    this.handlebarsEngineInit();
  }

  handlebarsEngineInit() {
    this.app.engine(
      'hbs',
      handlebars.engine({
        extname: 'hbs',
        defaultLayout: 'main',
        handlebars: allowInsecurePrototypeAccess(Handlebars),
      }),
    );
    this.app.set('view engine', 'hbs');
    this.app.set('views', `${__dirSrc}/views`);
  }

  async databaseInit() {
    this.db = await new Database(DB_URL).init();
  }

  socketsInit() {
    this.sockets = [];
    this.apiSocketInit('/api');
  }

  apiSocketInit() {
    apiSocketInit(this.appListen);
  }

  routesInit() {
    this.app.use('/', apiRouter);
  }
}

const myServer = new MyServer();
myServer.init();
