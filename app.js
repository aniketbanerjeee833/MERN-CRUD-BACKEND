
require("dotenv").config();

const express=require("express");
const app=express();
const cors=require("cors")

const connectDB = require("./db/connect");
const router=require("./router/userRouter")


app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());
app.use("/uploads",express.static("./uploads"));


app.use("/user",router)

const port= process.env.PORT||5000;
const start=async()=>
    {
        try{

            await connectDB(process.env.MONGO_URI)
            app.listen(port,console.log(`Server listening  on port ${port}`))
        }
        catch(error)
        {
            console.log(error);
        }
    }
start();