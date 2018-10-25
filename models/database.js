require('rootpath')();
const sqlite = require('sqlite');
const config = require('config/');

let db;

const connect = async () => {
    // keep database name on the config file, so we can customize that
    const filename = config.databaseFilename
    if (db) {
        return Promise.resolve(db);
    }
    db = sqlite.open(filename);

    return Promise.resolve(db);
};

const migrate = async () => connect()
    .then(db => db.migrate({ force: 'last' }))
    .catch(console.error); //be lenient about existent tables

const query = async (sql) => connect()
    .then(db => db.all(sql))
    .catch(console.error);

const execute = async (sql) => connect()
    .then( db => db.exec(sql));

/*
    I would like to use another kind of database like couch or a more robust db like mysql.
    But, since it's not a requirement on the project I will keep it simple! XD

    For some reason, Sqlite is droping the database everytime it runs the migration. I
    kept the migration turned-on for tests and the app for awhile.
*/
function Database () {
    this.db = connect()
    this.migrate = migrate
    this.query = query
    this.execute = execute
    return this
};

module.exports = new Database();