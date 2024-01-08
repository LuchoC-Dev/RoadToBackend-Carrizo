//  Basics imports

// Utils imports
import { PORT, APP_URL, DB_URL } from './utils/env.js';
import { __proyectDir, __srcDir } from './utils/dirnames.js';

// Class imports
import BigServer from './class/BigServer.js';

const publicDir = `${__proyectDir}/public`;
const viewsDir = `${__srcDir}/views`;
const appListenCallback = () => {
  console.log(`Sevidor iniciado en: ${APP_URL}`);
};
try {
  const server = new BigServer({
    port: PORT,
    publicPath: publicDir,
    hbsViewsPath: viewsDir,
    dbUrl: DB_URL,
    listenCallback: appListenCallback,
  });
  server.init();
} catch (error) {
  console.error(error);
}
