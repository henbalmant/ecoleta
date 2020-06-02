import express, { request, response } from 'express';

import CollectPointsController from './controllers/CollectPointsController';
import ItemsController from './controllers/ItemsController';

// types of actions by routes: index, show, create, update, delete

const routes = express.Router();
const collectPointsController = new CollectPointsController();
const itemsController = new ItemsController();

// items routes
// list all items
routes.get('/items', itemsController.index);

// collect points routes 
// create a collect point
routes.post('/collect_points', collectPointsController.create);
// show a specific collect point by id
routes.get('/collect_points/:id', collectPointsController.show);
// list a bunch of collect points by query params
routes.get('/collect_points', collectPointsController.index);

export default routes;
