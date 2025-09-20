const mongoose = require('mongoose');

const dbName = process.env.DB_NAME;
const dbUrl = process.env.DB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(`${dbUrl}/${dbName}`);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;