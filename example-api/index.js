const express = require('express');
const cors = require('cors');
// const mysql = require('promise-mysql');
// const locations = require('./app/locations');
// const categories = require('./app/categories');
// const items =require('./app/items');
const config = require('./config');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
    // const connection = await mysql.createConnection(config.database);
    //
    // app.use('/categories', categories(connection));
    // app.use('/locations', locations(connection));
    // app.use('/items', items(connection));

    app.listen(config.port, () => {
        console.log('HTTP server started ' + config.port)
    });
    // process.on('exit',()=>{
    //     connection.end()
    // })

};

run().catch(e => {
    console.error(e)
});