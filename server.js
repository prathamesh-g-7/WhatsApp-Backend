import express from 'express'
import mongoose from "mongoose";
import MongoClient  from "mongodb";
import userSchema from "./userModel.js";


const app = express()
const port = 3005

// DB config
const mongoURI =
  "mongodb+srv://prathamesh:89mpeNVc4m5U9Joz@cluster0.0rgxu.mongodb.net/whatsapp_DB?retryWrites=true&w=majority";
mongoose.connect(mongoURI, {
  // useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
    console.log("DB connected");
});


// API calls -> 

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/sign-up", (req, res) => {  
    const finalUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mobile: req.body.mobNumber,
    };
  
    userSchema.create(finalUser, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
  });

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port 3005`)
})