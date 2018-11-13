require('rootpath')();
const database = require('models/database');

const migrate = async () => {
    await database.migrate()
        .then(() => console.log('Finished migrations!'))
};

migrate();
