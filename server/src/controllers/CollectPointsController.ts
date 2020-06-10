import { Request, Response } from 'express';
import knex from '../database/connection';

class CollectPointsController {

    // create a collect point
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
            image: request.file.filename,
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
    
        const collectPointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((items_id: number) => {
                return {
                    items_id,
                    collect_points_id,
                };
        });
    
        await trx('collect_points_items').insert(collectPointItems);

        await trx.commit();
    
        return response.json({
            id: collect_points_id,
            ...collectPoint,
        });
    }

    // show a unique and specific collect point by id
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

        const serializedCollectPoint = {
            ...collect_point,
            image_url: `http://localhost:3333/uploads/${collect_point.image}`,
        }

        return response.json({ collect_point: serializedCollectPoint, items });
    }

    // list a bunch of collect points by query params
    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const collect_points = await knex('collect_points')
            .join('collect_points_items', 'collect_points.id', '=', 'collect_points_items.collect_points_id')
            .whereIn('collect_points_items.items_id', parsedItems)
            // .where('city', String(city))
            // .where('uf', String(uf))
            .distinct()
            .select('collect_points.*');

        const serializedCollectPoints = collect_points.map(collect_point => {
            return {
                ...collect_point,
                image_url: `http://localhost:3333/uploads/${collect_point.image}`,
            };
        })
    
        return response.json(serializedCollectPoints);
    }
}

export default CollectPointsController;
