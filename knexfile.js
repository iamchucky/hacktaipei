// Update with your config settings.

module.exports = {
  client: 'postgresql',
  connection: {
    host     : 'localhost',
    user     : 'postgres',
    password : 'badbeef123',
    database : 'hacktaipei',
    charset  : 'utf8'
  },
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};
