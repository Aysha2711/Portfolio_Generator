const mongoose = require ('mongoose');

const connectDB = async() => {
    try{
        const conn = await mongoose.connect('mongodb+srv://portfolio:port123@cluster0.h64p2gp.mongodb.net/portfoliodb?appName=Cluster0');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(error){
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;