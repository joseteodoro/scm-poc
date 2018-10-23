const sqlite = require('sqlite')

let db;

const migrate = db => Promise.resolve(db)
    .then(db => db.migrate({ force: 'last' }))
    .catch(() => {}) //be lenient about existent tables
    .then(() => db)

const connect = (filename = './database.sqlite') => {
  if (db) {
    return Promise.resolve(db);
  }
  db = sqlite.open(filename)
    .then(migrate)

  return Promise.resolve(db);
}

const query = async (sql) => connect()
    .then(db => db.all(sql))

const execute = async (sql) => connect()
    .then( db => db.exec(sql))

function Database () {
    this.query = query
    this.execute = execute
    return this
}

module.exports = new Database()