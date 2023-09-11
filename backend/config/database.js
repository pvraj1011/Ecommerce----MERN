const mg = require('mongoose')

const connectDataBase = () =>{
    mg.connect(process.env.DB_URL).then((data)=>
    {
        console.log(`MongoDB connected with Server : ${data.connection.host}`)
    });
}

module.exports = connectDataBase;