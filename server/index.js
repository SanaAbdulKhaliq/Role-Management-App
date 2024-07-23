const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const roleRoute = require('./routes/roleRoute');
const permissionRoute = require('./routes/permissionRoute');
const infoRoute = require('./routes/infoRoute')

const app = express();

//Middleware
app.use(express.json());
app.use(cors());



//Routes
app.use('/user', userRoute)
app.use('/role', roleRoute)
app.use('/permission', permissionRoute)
app.use('/info', infoRoute)

//Mongo connection
mongoose.connect('mongodb://127.0.0.1:27017/management-app')
.then(() => console.log('MongoDb conencted'))
.catch (err => console.log(err))

app.get('/', (req, res) => {
    res.send('Server is working')
})

app.listen(4000, () => {
    console.log('server is listening on port 4000');
})