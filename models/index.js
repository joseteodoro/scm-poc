require('rootpath')()
const database = require('models/database')
const sql = require('models/sql')
const { formatEvents, formatActors } = require('models/formater')

const CONFLICT = 409;

const makeErrorWithStatusCode = (message, errorCode) => Promise.reject({message, errorCode})

const found = rows => Array.isArray(rows) && rows.length

const alreadyExists = event => rows => found(rows)
    ? makeErrorWithStatusCode('Already exists', CONFLICT)
    : event

const listAllEvents = db => () => db.query(sql.listAllEventsSql())
    .then(formatEvents)

const listAllEventsByActor = db => actor_id => db.query(sql.listAllEventsByActorSql(actor_id || id))
    .then(formatEvents)

const insertIfNotFound = (db, sqlInsert) => rows => found(rows)
    ? {}
    : db.execute(sqlInsert)

const indepotentInsert = (db, result) => (sqlFind, sqlInsert) => db.query(sqlFind)
    .then(insertIfNotFound(db, sqlInsert))
    .then(() => result)

const addActor = (db, event) => () => indepotentInsert(db, event)(sql.findActorSql(event.actor), sql.insertActorSql(event.actor))

const addRepo = (db, event) => () => indepotentInsert(db, event)(sql.findRepoSql(event.repo), sql.insertRepoSql(event.repo))

const addEvent = db => event => db.execute(sql.insertEventSql(event))

const insertEvent = db => event => db.query(sql.findEventSql(event))
    .then(alreadyExists(event))
    .then(addActor(db, event))
    .then(addRepo(db, event))
    .then(addEvent(db))
    .then(() => event)

const truncate = db => () => db.execute(sql.truncateEventsSql())
    .then(() => db.execute(sql.truncateReposSql()))
    .then(() => db.execute(sql.truncateActorsSql()))
    .then(() => 'truncated.')

const listAllActors = db => () => db.query(sql.listAllActorsSql())
    .then(formatActors)

const streak = db => () => db.query(sql.streakSql())
    .then(formatActors)

const updateActor = db => actor => db.execute(sql.updateActorSql(actor))
    .then(() => {})

const eventsModel = {
    CONFLICT,
    listAll: listAllEvents(database),
    add: insertEvent(database),
    listAllByActor: listAllEventsByActor(database),
    truncate: truncate(database)
}

const actorsModel = {
    listAll: listAllActors(database),
    update: updateActor(database),
    streak: streak(database)
}

module.exports = {
    eventsModel,
    actorsModel
}