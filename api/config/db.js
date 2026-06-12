const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'helpdesk_ticket_system',
    password: 'M5rch@281998!',
    port: 5432
});

module.exports = pool;