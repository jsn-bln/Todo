const { urlencoded } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config()

app.use(express.json());
app.use(urlencoded({extended: true}));

const PORT = process.env.PORT || 5000;
const URI = process.env.URI

mongoose.connect(URI, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection
db.once('open', () => console.log('connected to Database successfully!'))
mongoose.set('useFindAndModify', false);
//* ROUTES
const userRoute = require('./Routes/users')
app.use('/users',userRoute)


app.listen(PORT, () => console.log(`server runnning on PORT:${PORT}`))