const express = require('express');

const app = express();
const port = 5000;

const cors = require('cors');

app.use(cors({
    origin: '*'
}))


const sneakerRoutes =require('./route/sneakers');

app.use(sneakerRoutes);

app.listen(port, ()=> console.log(`listening on port ${port}`) );