import { Request, Response } from 'express';
import knex from '../database/connection';

class CollectPointsController {
    async create(request: Request, response: Response) {
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

        const collectPoint = {
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        }
    
        const insertedIds = await trx('collect_points').insert(collectPoint);
    
        const collect_points_id = insertedIds[0];
    
        const collectPointItems = items.map((items_id: number) => {
            return {
                items_id,
                collect_points_id,
            };
        });
    
        await trx('collect_points_items').insert(collectPointItems);
    
        return response.json({
            id: collect_points_id,
            ...collectPoint,
        });
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const collect_point = await knex('collect_points').where('id', id).first();

        if (!collect_point) {
            return response.status(400).json({ message: 'Collect Point not found.' });
        }

        const items = await knex('items')
            .join('collect_points_items', 'items.id', '=', 'collect_points_items.items_id')
            .where('collect_points_items.collect_points_id', id)
            .select('items.title');

        return response.json({ collect_point, items });
    }
}

export default CollectPointsController;
