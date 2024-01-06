import { Router } from 'express';

const apiRouter = Router();
const path = '/api';

apiRouter.get(path, async (req, res) => {
  res.render('api', { css: 'api.css' });
});

export default apiRouter;
