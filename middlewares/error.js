const errorHandler = (err, req, res, next) => {
    // Log the error on the console and color it red
    console.log(err.stack.red);
    res.status(err.statusCode || 500).json( { success: false, error: err.message || 'Server Error'});
};

module.exports = errorHandler;
