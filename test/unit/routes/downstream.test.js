require('rootpath')()
const chai = require('chai')
const sinonChai = require('sinon-chai')
const { responseStatus, responseWithError, responseWithContent, downstream } = require('routes/downstream');

chai.use(sinonChai)
chai.should()
const expect = chai.expect

describe('routes/downstream suite', function () {
    
    let processedResponse
    let mockedRes
    
    beforeEach(() => {
        processedResponse = { status: null, json: null }
        mockedRes = { }
        
        const status = status => {
            processedResponse.status = status;
            return mockedRes;
        }
        
        const json = json => {
            processedResponse.json = json;
            return mockedRes;
        }
        
        mockedRes.json = json;
        mockedRes.status = status;
    })
    
    it('should call error status and message', async function () {
        const mockedResponse = {status: 404, message: 'Not Found'}
        await downstream(mockedRes)(Promise.reject(mockedResponse))
        expect(processedResponse).to.be.deep.equal({status: mockedResponse.status, json: mockedResponse.message})
    })
    it('should call status and content', async function () {
        const mockedResponse = {status: 201, content: {id: 1, name: 'french fries'}}
        await downstream(mockedRes)(Promise.resolve(mockedResponse))
        expect(processedResponse).to.be.deep.equal({status: mockedResponse.status, json: mockedResponse.content})
    })
})