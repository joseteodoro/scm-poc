const eventsModel = {
    CONFLICT: 409,
    listAll: () => ({}),
    add: (event) => ({}),
    listAllByActor: (id) => ({}),
    truncate: () => ({})
}

const actorsModel = {
    CONFLICT: 409,
    listAll: () => ({}),
    update: (actor) => ({}),
    listAllByActor: (id) => ({}),
    truncate: () => ({})
}

module.exports = {
    eventsModel,
    actorsModel: null
}