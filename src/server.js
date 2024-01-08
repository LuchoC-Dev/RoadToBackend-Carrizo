//  Basics imports

// Utils imports
import { PORT, APP_URL, DB_URL } from './utils/env.js';
import { __proyectDir, __srcDir } from './utils/dirnames.js';

// Class imports
import BigServer from './class/BigServer.js';

const appListenCallback = () => {
  console.log(`Sevidor iniciado en: ${APP_URL}`);
};

const server = new BigServer(PORT, appListenCallback, `${__proyectDir}/public`, `${__srcDir}/views`, DB_URL);
server.init();
