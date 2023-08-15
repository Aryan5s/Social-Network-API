const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const connectDB = require('./config/db');
const {userRoutes} = require('./routes/userRoutes');
const {postRoutes} = require('./routes/postRoutes')

app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.use('/api/' , userRoutes);
app.use('/api' , postRoutes)

app.listen(PORT , () => {
    console.log(`Server is Listening on Port : ${PORT}`)
    // connectDB();
})