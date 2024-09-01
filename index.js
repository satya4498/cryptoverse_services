const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('./config');
const {userRoute} = require('./routes/userRoutes');
const { connection } = require("./database/dbConnection");




const app = express();
// app.use({
//     origin: config.corsOrigin,
//     credentials: true,
//     allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Authorization'],  // This needs to match the allowed headers in the frontend code. Replace 'Origin', 'X-Requested-With', 'Content-Type' with the actual headers that your frontend code sends.  // Add more headers as needed.  // Replace 'corsOrigin' with the actual URL of your frontend code.  // Replace 'your-client-id' with your Google Cloud Platform client ID.  // Replace 'your-client-secret' with your Google Cloud Platform client secret.
//     credentials: true,
// })
app.use(cors({ origin: true, credentials: true }));
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