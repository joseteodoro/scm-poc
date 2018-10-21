require('rootpath')()
const { actorsModel } = require('models')

const formatActors = (content, status) => ({status, content})

const formatActorsWithStatus = status => content => formatEvents(content, status)

const serverError = ({message, status = 500}) => Promise.reject(Object.assign(new Error(message), status))

const notFound = actorId => ({status: 404, message: `Could not found actor with id:${actorId}`});

const couldFindActor = actorId => events => events && events.length ? events : Promise.reject(notFound(actorId))

var listAll = () => actorsModel.listAll()
    .then(formatActorsWithStatus(200))
    .catch(serverError);

var updateActor = actor => actorsModel.update(actor)
    .then(formatActorsWithStatus(200))
    .catch(formatError(event));

var getStreak = () => eventsModel.streak()
    .then(formatActorsWithStatus(200))
    .catch(formatError({}));

module.exports = {
	updateActor,
	listAll,
	getStreak
};
















