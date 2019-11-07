const dotenv = require('dotenv');
const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');

// Load the environment variables
dotenv.config({ path: './config/config.env' });

// Load models
const Bootcamp = require('./models/Bootcamp');

// Connect Database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const bootcamp = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));

// Add it to database

const importData = async () => {
    try {
        await Bootcamp.create(bootcamp);
        console.log('Data imported --- '.green.inverse);
        process.exit();
    } catch (err) {
        console.log(err.message.red.bold)
    }
};

// Delete Data from Database
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        console.log('Data Deleted --- '.red.inverse);
        process.exit();
    } catch (err) {
        console.log(err.message.red.bold)
    }
};
// node seeder -i argv [2] === -i
// node seeder -d argv[2] === -d

if(process.argv[2] === '-i') {
    importData();
} else if(process.argv[2] === '-d') {
    deleteData();
}

