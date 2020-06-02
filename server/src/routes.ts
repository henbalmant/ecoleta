import express, { request, response } from 'express';
import knex from './database/connection';

const routes = express.Router();

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

routes.post('/collect_points', async (request, response) => {
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items,
    } = request.body;

    const trx = await knex.transaction();

    const insertedIds = await trx('collect_points').insert({
        image: 'image-fake',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
    });

    const collect_points_id = insertedIds[0];

    const collectPointItems = items.map((items_id: number) => {
        return {
            items_id,
            collect_points_id,
        };
    });

    await trx('collect_points_items').insert(collectPointItems);

    return response.json({ success: true });
});

export default routes;
