const knex = require('knex');
const knexConfig = require('../config/knexfile');
const { Model } = require('objection');

const db = knex(knexConfig.development);
Model.knex(db); 

module.exports = db;
