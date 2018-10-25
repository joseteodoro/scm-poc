require('rootpath')();
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {	listAll, addEvent, getByActor, eraseAllEvents } = require('controllers/events');
const {	eventsModel } = require('models');

chai.use(sinonChai);
chai.should();
const expect = chai.expect;

describe('controllers/events suite', function () {

    beforeEach(() => {
        sandbox = sinon.createSandbox()
    })
    afterEach(() => {
        sandbox.restore()
    })

    it('should truncate the database', async function () {
        const truncateSpy = sandbox.stub(eventsModel, 'truncate').resolves({message: 'Database truncated.'})
        const res = await eraseAllEvents()
        expect(res).to.be.deep.equal({status: 200, content: {message: 'Database truncated.'}})
    })
    it('should manage the error properly if get error truncating the database', async function () {
        const truncateSpy = sandbox.stub(eventsModel, 'truncate').rejects({message: 'Could not find the database.'})
        expect(eraseAllEvents()).to.be.eventually.rejected
    })
    it('should list actions by actor properly', async function () {
        sandbox.stub(eventsModel, 'listAllByActor').resolves([{id: 1}, {id: 2}])
        const events = await getByActor(1002)
        const expectedContent = {
            status: 200, content: [{
                "actor": undefined,
                "created_at": undefined,
                    "id": 1,
                "repo": undefined,
                "type": undefined,
            },
            {
                "actor": undefined,
                "created_at": undefined,
                "id": 2,
                "repo": undefined,
                "type": undefined,
            }
        ]}
        expect(events).to.be.deep.equal(expectedContent)
    })
    it('should manage the error properly if get no result back', async function () {
        sandbox.stub(eventsModel, 'listAllByActor').resolves([])
        expect(getByActor(1002)).to.be.eventually.rejected
    })
    it('should list all properly', async function () {
        sandbox.stub(eventsModel, 'listAll').resolves([{id: 1}, {id: 2}])
        const expectedContent = {
            status: 200, content: [{
                "actor": undefined,
                "created_at": undefined,
                    "id": 1,
                "repo": undefined,
                "type": undefined,
            },
            {
                "actor": undefined,
                "created_at": undefined,
                "id": 2,
                "repo": undefined,
                "type": undefined,
            }
        ]}
        const events = await listAll()
        expect(events).to.be.deep.equal(expectedContent)
    })
    it('should manage the error if failing when listing all events', async function () {
        sandbox.stub(eventsModel, 'listAll').rejects({message: 'Could not find the database.'})
        expect(listAll()).to.be.eventually.rejected
    })
    it('should add the event and return the object created', async function () {
        const mockedevent = {'id':3822562012, type: 'PushEvent'}
        sandbox.stub(eventsModel, 'add').resolves(mockedevent)
        const events = await addEvent(mockedevent)
        expect(events).to.be.deep.equal({status: 201, content: mockedevent})
    })
    it('should manage the error if failing when adding event', async function () {
        sandbox.stub(eventsModel, 'add').rejects({message: 'Could not find the database.'})
        expect(addEvent({id: 42})).to.be.eventually.rejected
    })
})