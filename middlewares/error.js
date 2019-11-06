const ErrorResponse = require('../utils/errorResponse');
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
   error.message = err.message;
    // Log the error on the console and color it red
    console.log(err.stack.red);
    if(err.name === 'CastError') {
        const message = `Unable to get boot camp for id ${err.value}`;
        error = new ErrorResponse(message, 404);
    }
    res.status(error.statusCode || 500).json( { success: false, error: error.message || 'Server Error'});
};

module.exports = errorHandler;
