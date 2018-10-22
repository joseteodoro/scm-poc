const CONFLICT = 409;

const eventsModel = {
    CONFLICT,
    listAll: () => ({}),
    add: (event) => ({}),
    listAllByActor: (id) => ({}),
    truncate: () => ({})
};

const actorsModel = {
    listAll: () => ({}),
    update: (actor) => ({}),
    streak: () => ({})
};

module.exports = {
    eventsModel,
    actorsModel
};