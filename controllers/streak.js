
const sorterByEventDay = (left, right) => right.created_day - left.created_day

const sortEvents = events => {
    events.sort(sorterByEventDay)
    return events
}

const mapByCreated_day = event => event.created_day

const acc = (today, yesteday) => {
    return today - yesteday === 1 ? 1 : 0
}

const nonEmpty = element => !!element

const groupContigousDays = accs => accs.join('').split('0').filter(nonEmpty).map(group => group.length)

const maxStreak = groups => Math.max(...groups)

const accDays = days => (yesteday, index) => {
    return acc(days[index-1], yesteday)
}

const formatStreak = ({created_at, actor}, streak) => ({
    lastEvent: created_at,
    streak,
    ...actor
})

// would be better use promise here to control the flow, but
//     the sort method could not order the promises, so I kept 
//     the code in this way. I will back here if have time before the 
//     submission
const streak = events => {
    if (events.length < 2) {
        const lastEvent = events[0]
        return formatStreak(lastEvent, 0)
    }
    const sorted = sortEvents(events)
    const lastEvent = sorted[0]
    const days = sorted.map(mapByCreated_day)
    const accs = days.map(accDays(days))
    const streaks = groupContigousDays(accs)
    return formatStreak(lastEvent, maxStreak(streaks))
}

const groupByActor = (previous, event) => {
    if (!previous[event.actor.id]) {
        previous[event.actor.id] = []
    }
    previous[event.actor.id].push(event)
    return previous
}

const streakFromActor = (groups, actorId) => streak(groups[actorId])

const compute = events => {
    const grouped = events.reduce(groupByActor, {})
    return Object.keys(grouped).map(actorId => streakFromActor(grouped, actorId))
}

const compareStr = (left, right) => {
    if (right > left) {
        return 1
    }
    if (right < left) {
        return -1
    }
    return 0
}

const streakSorter = (left, right) => right.streak - left.streak ||
    compareStr(left.lastEvent, right.lastEvent) ||
    compareStr(right.login, left.login)

// there are a lot of points to improve here, like cache to avoid actor's recomputation,
//       the code is not promisified, we could use the database structure to store some 
//       intermediate data and so on
const sortedStreak = events => {
    const computed = compute(events)
    computed.sort(streakSorter)
    return computed
}

const serverError = ({message, status = 500}) => ({message, status})

const formatError = ({id}) => err => Promise.reject(serverError(err))

const formatEvents = (content, status) => ({status, content})

const formatEventsWithStatus = status => content => formatEvents(content, status)

const streakForAllEvents = () => eventsModel.listAll()
    .then(sortedStreak)
    .then(formatEventsWithStatus(200))
    .catch(formatError({}));

module.exports = {
    compute,
    sortedStreak,
    streakForAllEvents
}