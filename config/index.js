const pg = require('pg');
require('dotenv').config();

const pool = new pg.Pool({
  connectionString: 'postgres://uic_xqk2_user:WffqqN1KdXuaNKRre0KjqXnjAniNbS6N@dpg-cobj2fun7f5s73fq1pi0-a/uic_xqk2'
});

module.exports = pool;