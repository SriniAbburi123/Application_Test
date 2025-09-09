// app.js
import express from 'express';
import bodyParser from 'body-parser';
import router from './controllers/AppController.js';

const app:express.Application =  express();
app.use(bodyParser.json());
 
console.log("Started the app");
 
// app.use('/api', router);
app.use('', router);

export default app;