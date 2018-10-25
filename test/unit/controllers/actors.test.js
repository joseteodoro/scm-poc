require('rootpath')();
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {	updateActor, listAll, getStreak } = require('controllers/actors');
const {	actorsModel } = require('models');

chai.use(sinonChai);
chai.should();
const expect = chai.expect;

describe('controllers/actors suite', function () {

    beforeEach(() => {
        sandbox = sinon.createSandbox()
    })
    afterEach(() => {
        sandbox.restore()
    })

    it('should list all actors', async function () {
        sandbox.stub(actorsModel, 'listAll').resolves([{id: 122221}, {id: 23323}])
        const actors = await listAll()
        expect(actors).to.be.deep.equal({status: 200, content: [{id: 122221}, {id: 23323}]})
    })
    it('should manage the error properly if get error truncating the database', async function () {
        const truncateSpy = sandbox.stub(actorsModel, 'listAll').rejects({message: 'Could not find the database.'})
        expect(listAll()).to.be.eventually.rejected
    })
    it('should update actor properly', async function () {
        sandbox.stub(actorsModel, 'update').resolves({})
        const res = await updateActor()
        expect(res).to.be.deep.equal({status: 200, content: {}})
    })
    it('should manage the error properly if get error updating the actor', async function () {
        const truncateSpy = sandbox.stub(actorsModel, 'update').rejects({message: 'Could not find the database.'})
        expect(updateActor()).to.be.eventually.rejected
    })
    it('should call streak functions', async function () {
        sandbox.stub(actorsModel, 'streak').resolves([{id: 122221}, {id: 23323}])
        const res = await getStreak()
        expect(res).to.be.deep.equal({status: 200, content: [{id: 122221}, {id: 23323}]})
    })
    it('should manage the error properly if get error updating the actor', async function () {
        const truncateSpy = sandbox.stub(actorsModel, 'streak').rejects({message: 'Could not find the database.'})
        expect(getStreak()).to.be.eventually.rejected
    })
})