const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('./config');
const {userRoute} = require('./routes/userRoutes');
const { connection } = require("./database/dbConnection");




const app = express();
app.use(cors());
app.use(cookieParser())
app.use(express.json())

app.use('/api/v1', userRoute)

app.listen(config.port, async ()=> {
    try{
        await connection;
        console.log('Database connected successfully')
    console.log(`Server running on port ${config.port}`)
    }catch(e){
        console.error(e)
    }
})