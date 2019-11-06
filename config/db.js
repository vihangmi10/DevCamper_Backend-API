const mongoose = require('mongoose');

const connection = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
       useNewUrlParser: true,
       useCreateIndex: true,
       useFindAndModify: false,
       useUnifiedTopology: true
    });
    console.log(`CONNECTION SUCCESSFUL TO DATABASE AT ${conn.connection.host}` .cyan.underline.bold);
};

module.exports = connection;
