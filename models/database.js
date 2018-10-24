require('rootpath')()
const sqlite = require('sqlite')
const config = require('config/')

let db;

const connect = async () => {
    const filename = config.databaseFilename
    if (db) {
        return Promise.resolve(db);
    }
    db = sqlite.open(filename);

    return Promise.resolve(db);
}

const migrate = async () => connect()
    .then(db => db.migrate({ force: 'last' }))
    .catch(console.error) //be lenient about existent tables

const query = async (sql) => connect()
    // .then(debug(sql))
    .then(db => db.all(sql))
    .catch(console.error)

const execute = async (sql) => connect()
    // .then(debug(sql))
    .then( db => db.exec(sql))

function Database () {
    this.db = connect()
    this.migrate = migrate
    this.query = query
    this.execute = execute
    return this
}

module.exports = new Database()