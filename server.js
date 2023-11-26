const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = require("./models");
const config = require("./models/db.config");

app.use(express.urlencoded({ extended: true }));

const url = `mongodb://${config.HOST}:${config.PORT}/${config.DB}`;

const Role = db.role;

db.mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() =>{
    console.log("Successfully connected to the database!");
    Init();
}).catch(err =>{
    console.log("Can't connect to database! Error occured.", err);
})

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) =>{
    res.status(200).json({ msg: "Its a big rich town!" });
})

app.listen(PORT, ()=>{
    console.log(`Port running on port ${PORT}...`);
});

function Init() {
    Role.estimatedDocumentCount((err, count) =>{
        if(!err && count === 0){
            new Role({
                name: "user"
            }).save(err =>{
                if(err){
                    console.log(err);
                }else{
                    console.log("User role created!");
                }
            });

            new Role({
                name: "marketer"
            }).save(err =>{
                if(err) {
                    console.log("Error", err);
                }else{
                    console.log("Marketer role created successfully!");
                }
            });

            new Role({
                name: "admin"
            }).save(err =>{
                if(err) {
                    console.log("Error", err);
                }else{
                    console.log("Admin role created successfully!");
                }
            });
        }
    })
}