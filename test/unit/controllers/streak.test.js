require('rootpath')();
const chai = require('chai');
const fs = require('fs');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
chai.should();
const expect = chai.expect;

const streak = require('controllers/streak');

describe('controllers/streak', () => {
    it('when have enough data, should sort the streak properly', async () => {
        const contents = fs.readFileSync('test/unit/controllers/data/events.json', 'utf8')
        const events = JSON.parse(contents)
        const expectedContent = fs.readFileSync('test/unit/controllers/data/expected.json', 'utf8')
        const expected = JSON.parse(expectedContent)
        const computed = await streak.sortedStreak(events)
        expect(computed).to.be.deep.equal(expected)
    })
})