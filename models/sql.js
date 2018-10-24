const moment = require('moment')

const listAllEventsSql = () => `select e.*, a.login, a.avatar_url, r.name, r.url from Event e, Actor a, Repo r
    where e.actor_id = a.id
    and e.repo_id = r.id
    order by e.id`

const listAllEventsByActorSql = actor_id => `select e.*, a.login, a.avatar_url, r.name, r.url from Event e, Actor a, Repo r
    where e.actor_id = a.id
    and e.repo_id = r.id
    and e.actor_id = ${actor_id}
    order by e.id`

const listAllActorsSql = () => `select a.*, COUNT(e.id), (SELECT ev.created_at FROM Event ev where ev.actor_id = a.id ORDER BY ev.created_at DESC LIMIT 1) as lastEntry from Actor as a, Event as e
    where a.id = e.actor_id
    GROUP by e.actor_id
    ORDER by COUNT(e.id) DESC, lastEntry DESC, a.login ASC;`

const streakSql = () => `select a.*, COUNT(e.id) from Actor as a, Event as e
    where a.id = e.actor_id
    GROUP by a.id
    ORDER by COUNT(e.id) DESC`

const insertEventSql = ({id, type, created_at, actor, repo}) => `INSERT INTO Event 
(id, "type", created_at, actor_id, repo_id, created_day) 
VALUES(${id}, '${type}', ${moment(created_at).valueOf()}, ${actor.id}, ${repo.id}, ${moment(created_at).startOf('day').valueOf()})`

const insertActorSql = ({id, login , avatar_url}) => `INSERT INTO Actor  
(id, login, avatar_url) VALUES(${id}, '${login}', '${avatar_url}')`

const insertRepoSql = ({id, name, url}) => `INSERT INTO Repo
    (id, name, url)
    VALUES(${id}, '${name}', '${url}')`

const findActorSql = ({id}) => `select * from Actor where id = ${id}`

const findRepoSql = ({id}) => `select * from Repo where id = ${id}`

const findEventSql = ({id}) => `select e.id from Event e where e.id = ${id}`

const truncateEventsSql = () => `delete from Event where id > 0`

const truncateReposSql = () => `delete from Repo where id > 0`

const truncateActorsSql = () => `delete from Actor where id > 0`

const updateActorSql = ({id, avatar_url}) => `UPDATE Actor SET avatar_url='${avatar_url}' WHERE id=${id}`

module.exports = {
    listAllEventsSql,
    listAllEventsByActorSql,
    streakSql,
    insertEventSql,
    insertActorSql,
    insertRepoSql,
    findActorSql,
    findRepoSql,
    findEventSql,
    truncateEventsSql,
    truncateReposSql,
    truncateActorsSql,
    listAllActorsSql,
    updateActorSql
}