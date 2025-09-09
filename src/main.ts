// server.js  -- Entry point to the application.
import * as dotenv from "dotenv";
import app from './app.js';
import mongoose from 'mongoose'; 

dotenv.config();

const port = process.env.PORT;
const dbHost = process.env.DB_HOST;
const jwtSecret = process.env.JWT_SECRET;

// console.log("Port: ",  port, "DB Host:", dbHost );

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/employeedb');
mongoose.connect(`mongodb://${dbHost}:27017/employeedb`);
console.log("DB Connection is successful");

// Start server
app.listen(port, () => {
  console.log('Server running on http://localhost:3000');
});