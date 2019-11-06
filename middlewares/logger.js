const logger = (req, res, next) => {
    console.log(`METHOD: ${req.method} PROTOCOL: ${req.protocol} HOST: ${req.get('host')} URL: ${req.originalUrl}`);
    next();
}

module.exports = logger
