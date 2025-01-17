require('dotenv').config();
const express = require('express');
const app = express();
const {dbConnect} = require('./config/db');
const PORT = 3000 || process.env.PORT;

const authRoutes = require('./routes/authRoute');

// Middleware to parse JSON request bodies

app.use(express.json()); 


app.use('/api', authRoutes);  // /api/register, /api/login, /api/logOut



dbConnect();

app.listen(PORT, ()=>{console.log(`Server connected on port ${PORT}`)});








