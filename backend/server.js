const app = require('./app');

const dotenv = require('dotenv');
const cloudinary = require('cloudinary')
const connectDataBase = require('./config/database');



//Handling Uncaught Exceptions
process.on('uncaughtException',err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the Server due to Uncaught Exceptions!!`)

    server.close(()=>{
        process.exit(1);
    })
})

//config
dotenv.config({path:'backend/config/config.env'})


//Connect Database
connectDataBase();

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})


// Unhandled Promise Rejection
process.on('unhandledRejection',err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the Server due to Unhandled Promise Rejection!!`)

    server.close(()=>{
        process.exit(1);
    })
})