const { StatusCodes, getReasonPhrase } = require('http-status-codes')
module.exports = (err, req, res, next) => {
  let error = { ...err };

  if (err?.name === 'CastError') {
    error.statusCode = StatusCodes.NOT_FOUND;
    error.message = 'Resource not found'
  }

  if (err.statusCode === 400) {
    error.statusCode = StatusCodes.BAD_REQUEST;
    error.message = err.message || getReasonPhrase(StatusCodes.BAD_REQUEST);
  }

  if (err.statusCode === 401) {
    error.statusCode = StatusCodes.UNAUTHORIZED;
    error.message = err.message || getReasonPhrase(StatusCodes.UNAUTHORIZED);
  }

  if (err.statusCode === 403) {
    error.statusCode = StatusCodes.FORBIDDEN;
    error.message = err.message || getReasonPhrase(StatusCodes.FORBIDDEN)
  }

  if (err.statusCode === 404) {
    error.statusCode = StatusCodes.NOT_FOUND;
    error.message = err.message || getReasonPhrase(StatusCodes.NOT_FOUND)
  }

  if (err.code === 11000) {
    err.statusCode = StatusCodes.BAD_REQUEST;
    err.message = 'Duplicate resource'
  }

  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = error.message || err.message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);
  const stack = error.stack || err.stack
  console.log(stack);

  res.status(statusCode).json({
    statusCode,
    message
  });
};
