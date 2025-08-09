/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('airplane',(table)=>{
    table.increments('id').primary();
    table.string('modelNumber').notNullable().unique();
    table.integer('capacity').notNullable().defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
  .then(()=>{
    return knex.raw(`
      ALTER TABLE airplane
      ADD CONSTRAINT capacity_max CHECK (capacity <= 500 and capacity>=1)
    `)})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('airplane')
};
