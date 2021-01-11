const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config()



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const URI = process.env.URI

//*cors


mongoose.connect(URI, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
const db = mongoose.connection
db.once('open', () => console.log('connected to Database successfully!'))

//* ROUTES
const userRoute = require('./Routes/users')
app.use('/users',userRoute)


app.listen(PORT, () => console.log(`server runnning on PORT:${PORT}`))