require('rootpath')()
const { eventsModel } = require('models')

const formatEvents = (content, status) => ({status, content})

const formatEventsWithStatus = status => content => formatEvents(content, status)

const serverError = ({message, status = 500}) => Object.assign(new Error(message), status)

const conflict = id => serverError({status: 409, message: `Event with id:${id} already exists.`})

const formatError = ({id}) => err => err.errorCode === eventsModel.CONFLICT
    ? Promise.reject(conflict(id))
    : Promise.reject(serverError(err));

const notFound = actorId => ({status: 404, message: `Could not found actor with id:${actorId}`});

const couldFindActor = actorId => events => events && events.length ? events : Promise.reject(notFound(actorId))

const addEvent = event => eventsModel.add(event)
    .then(formatEventsWithStatus(201))
    .catch(formatError(event));
        
const listAll = () => eventsModel.listAll()
    .then(formatEventsWithStatus(200))
    .catch(formatError({}));

const getByActor = id => eventsModel.listAllByActor(id)
    .catch(formatError({}))
    .then(couldFindActor(id))
    .then(formatEventsWithStatus(200));
        
const eraseAllEvents = () => eventsModel.truncate()
    .then(formatEventsWithStatus(200))
    .catch(formatError({}));

module.exports = {
	listAll,
    addEvent,
	getByActor,
	eraseAllEvents
};

















