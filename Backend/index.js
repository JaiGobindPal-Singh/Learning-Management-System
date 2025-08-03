import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './configs/mongoose.config.js';
dotenv.config();
const app = express();


//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());


//a basic route to check if the server is running
app.get('/', (req, res) => {
  res.send('server is running');
}
);


//starts th server
app.listen(process.env.SERVER_PORT,async () => {
     try{
          await connectDB();
          console.log("Connected to MongoDB");
          console.log(`Server is running on port ${process.env.SERVER_PORT}`);
          
     } catch (e) {
          console.error("Error starting Server:", e);
     }
});