const responseStatus = res => status => res.status(status);

const responseWithContent = res => ({status = 500, content}) => responseStatus(res)(status).json(content);

const responseWithError = res => ({status = 500, message}) => responseStatus(res)(status).json(message);

const downstream = res => promise => Promise.resolve(promise)
    .then(responseWithContent(res))
    .catch(responseWithError(res));
    
module.exports = {
    responseStatus,
    responseWithError,
    responseWithContent,
    downstream
};