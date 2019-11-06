const express = require('express');
const dotenv = require('dotenv');
// import middlewares our function
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/error');
// Use 3rd party middleware
const morgan = require('morgan');
const colors = require('colors');
// Import all the routes
// import database config
const connection = require('./config/db');
const bootcamps = require('./routes/bootcamps');
dotenv.config({ path: './config/config.env'});
connection();
const app = express();
// Add in-built middleware to parse the body
app.use(express.json());
app.use(logger); // Our custom made middleware. A function that runs during a single req res cycle and has access to req res object
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use('/api/v1/bootcamps', bootcamps);

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`The server is running in envrionment ${process.env.NODE_ENV} on port ${PORT}` .yellow.bold));

// Handle -  unhandled promise rejection error simply crash the app.
process.on('unhandledRejection', (err, promise) => {
   console.log('Error: ', err);
   // close the server
    server.close(() => {
       process.exit(1);
    });
});
