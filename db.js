import pg from 'pg'
const { Pool } = pg

const db = new Pool({
  ssl: {
    rejectUnauthorized: false
  },
  connectionString:
    'postgres://b11g03_airbnb_api_database_based_on_user:v5pXaTJps4OTZtzYRhsWKBkpjv7cME8n@dpg-cn7di8021fec73fl9k10-a.singapore-postgres.render.com/b11g03_airbnb_api_database_based_on'
})

export default db

import { DBURL } from './secrets.js'
const db = new Pool({
  ssl: {
    rejectUnauthorized: false
  },
  connectionString: DBURL
})
