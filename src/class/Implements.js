import handlebars from 'express-handlebars';
import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';

export const useHandlebars = (app, viewPath) => {
  const setEngine = (app) => {
    app.engine(
      'hbs',
      handlebars.engine({
        extname: 'hbs',
        defaultLayout: 'main',
        handlebars: allowInsecurePrototypeAccess(Handlebars),
      }),
    );
  };

  try {
    setEngine(app);
    app.set('view engine', 'hbs');
    app.set('views', viewPath);
  } catch (error) {
    throw new Error(error);
  }
};
