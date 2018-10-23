const moment = require('moment')

const formatActor = ({ actor_id, id, login, avatar_url }) => ({id: actor_id || id, login, avatar_url})

const formatActors = actors => actors.map(formatActor)

const formatRepo = ({ repo_id, name, url  }) => ({id: repo_id, name, url})

const formatEvent = ({ id, type, created_at, actor_id, repo_id, login, avatar_url, name, url }) => ({
    id,
    type,
    created_at: created_at ? moment(created_at).format('YYYY-MM-DD HH:mm:ss') : '',
    actor: formatActor({actor_id, login, avatar_url}),
    repo: formatRepo({repo_id, name, url})
})

const formatEvents = events => events.map(formatEvent)

module.exports = {
    formatActor,
    formatRepo,
    formatEvent,
    formatEvents,
    formatActors
}