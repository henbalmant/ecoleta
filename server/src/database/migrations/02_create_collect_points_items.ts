import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('collect_points_items', table => {
        table.increments('id').primary();
        table.integer('collect_points_id')
            .notNullable()
            .references('id')
            .inTable('collect_points');

        table.integer('items_id')
            .notNullable()
            .references('id')
            .inTable('items');;
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('collect_points_items');
}
