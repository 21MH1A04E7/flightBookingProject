/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

  await knex('airplane').del()
  await knex('airplane').insert([
    { modelNumber: 'airbusa380', capacity: 900 },
    { modelNumber: 'airbus340', capacity: 900 },
    { modelNumber: 'boeing777', capacity: 450 }
  ]);
};
