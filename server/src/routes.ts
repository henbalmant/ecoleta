import express, { request, response } from 'express';
import knex from './database/connection';

import CollectPointsController from './controllers/CollectPointsController';

const routes = express.Router();
const collectPointsController = new CollectPointsController();

routes.get('/items', async (request, response) => {
    const items = await knex('items').select('*');

    const serializedItems = items.map(item => {
        return {
            id: item.id,
            name: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`,
        };
    })

    return response.json(serializedItems);
});

routes.post('/collect_points', collectPointsController.create);

export default routes;
