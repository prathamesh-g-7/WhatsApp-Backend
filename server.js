const express = require('express')
const mongoose = require("mongoose")
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const userSchema = require("./userModel.js")


const app = express()
const port = 3005

app.use(bodyParser.json());

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

// signup API
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

// API to check if user already exist
app.post("/user-exist", (req, res) => {  
  MongoClient.connect(mongoURI, async(err, db) => {
    if (err) throw err;

    let mobile = req.body.mobNumber;
    const dbo = db.db("whatsapp_DB");

    await dbo.collection("users").findOne({ mobile: mobile}, (err, result) => {
      if (err) throw err;

      if (result) {
        if (result.mobile === mobile) {
          res.status(200).send("User Already Exist With This Number");
        } else {
          res.status(200).send("User not found");
        }
      } else {
        res.status(200).send("Faild To Fetch Details");
      }
    });
  })
});


app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port 3005`)
})