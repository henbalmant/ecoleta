import express, { request, response } from 'express';

import CollectPointsController from './controllers/CollectPointsController';
import ItemsController from './controllers/ItemsController';

// index, show, create, update, delete

const routes = express.Router();
const collectPointsController = new CollectPointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);
routes.post('/collect_points', collectPointsController.create);

export default routes;
