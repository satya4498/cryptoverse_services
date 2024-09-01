require('dotenv').config()

module.exports = {
    port: process.env.PORT || 8080,
    mongoURI: process.env.MONGO_URI ||'mongodb://localhost/your-database-name',
    jwtSecret: process.env.JWT_SECRET || 'your-jwt-secret',
    jwtSession: {
        session: {
            secret: process.env.JWT_SECRET,
            resave: false,
            saveUninitialized: false
        },
        expiresIn: '1h'
    },
    mySqlUri: ''
}