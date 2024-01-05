//  Basics imports
import express from 'express';

// Utils imports
import { PORT, APP_URL } from './utils/env.js';
import Database from './class/Database.js';

const app = express();
const httpServer = app.listen(PORT, () => {
  console.log(`Sevidor iniciado en: ${APP_URL}`);
});

const initDB = async (httpServer) => {
  const db = new Database(httpServer);
  return await db.init();
};

const db = initDB(httpServer);
