require('rootpath')();
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
chai.should();
const expect = chai.expect;

const { formatEvents, formatActors } = require('models/formater');

describe('models/formater suite', () => {
    it('should format events properly', () => {
        const events = [
            { id: 1, type: 'PushEvent', created_at: 23333334444, actor_id: 22, repo_id: 44, login: 'potato', avatar_url: 'http://22', name: 'repo-22', url: 'http://22'},
            { id: 2, type: 'PushEvent', created_at: 12500000222, actor_id: 11, repo_id: 44, login: 'french fries', avatar_url: 'http://11', name: 'repo-11', url: 'http://11'},
            { id: 3, type: 'PushEvent', created_at: 25000034444, actor_id: 33, repo_id: 2, login: 'gumball', avatar_url: 'http://33', name: 'repo-33', url:'http://33' }
        ]
        const formated = formatEvents(events)
        expect(formated).to.be.deep.equal([
            {
              actor: {
                avatar_url: 'http://22',
                id: 22,
                login: 'potato',
              },
              created_at: '1970-09-27 22:28:54',
              id: 1,
              repo: {
                id: 44,
                name: 'repo-22',
                url: 'http://22',
              },
              type: 'PushEvent',
            },
            {
              actor: {
                avatar_url: 'http://11',
                id: 11,
                login: 'french fries'
              },
              created_at: '1970-05-25 13:13:20',
              id: 2,
              repo: {
                id: 44,
                name: 'repo-11',
                url: 'http://11',
              },
              type: 'PushEvent',
            },
            {
              actor: {
                avatar_url: 'http://33',
                id: 33,
                login: 'gumball'
              },
              created_at: '1970-10-17 05:27:14',
              id: 3,
              repo: {
                id: 2,
                name: 'repo-33',
                url: 'http://33'
              },
              type: 'PushEvent'
            }
        ])
    })
    it('should format actors properly', () => {
        const actors = [
            { actor_id: 100000, login: '100000', avatar_url: 'http://100000' },
            { id: 200, login: '200', avatar_url: 'http://200' },
            { id: 300, login: '300', avatar_url: 'http://300' }
        ]
        const formated = formatActors(actors)
        expect(formated).to.be.deep.equal([
            {
              avatar_url: 'http://100000',
              id: 100000,
              login: '100000'
            },
            {
              avatar_url: 'http://200',
              id: 200,
              login: '200'
            },
            {
              avatar_url: 'http://300',
              id: 300,
              login: '300'
            }
        ])
    })
})