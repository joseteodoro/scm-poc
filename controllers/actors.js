require('rootpath')();
const { actorsModel } = require('models');

const formatActors = (content, status) => ({status, content});

const formatActorsWithStatus = status => content => formatActors(content, status);

const serverError = ({message, status = 500}) => Promise.reject({message, status});

var listAll = () => actorsModel.listAll()
    .then(formatActorsWithStatus(200))
    .catch(serverError);

var updateActor = actor => actorsModel.update(actor)
    .then(formatActorsWithStatus(200))
    .catch(serverError);

var getStreak = () => actorsModel.streak()
    .then(formatActorsWithStatus(200))
    .catch(serverError);

module.exports = {
	updateActor,
	listAll,
	getStreak
};