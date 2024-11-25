import express from "express";
import { PORT , mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from 'cors';
import moviesRoute from  "./routes/moviesRoute.js"




const app = express();
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    console.log(req);
    res.send('Hello World');
})






app.use('/movies', moviesRoute);
// Connect to MongoDB and start the server
mongoose
    .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
    });