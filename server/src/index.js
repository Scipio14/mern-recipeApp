import app from "./app.js";
import mongoose from 'mongoose';
import {config} from 'dotenv'
config();
const PORT = process.env.PORT || 4000

mongoose.connect(process.env.MONGODB_URI).then(()=>console.log("Database Connected"))

app.listen(PORT,()=> console.log("Server running on port " + PORT))