const express=require("express");
const Sequelize=require("sequelize");
const bodyparser=require("body-parser");
const sequelize = require("./DBConfig/db");
const User=require("./models/user");
const FavouriteMovie=require("./models/favourite_movie");
const userRout=require("./routers/user_rout");
const app=express();
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(userRout)
//association

User.hasMany(FavouriteMovie);
FavouriteMovie.belongsTo(User);


//sync with data base

sequelize.sync();

app.listen(8000,()=>{
    console.log("server is running in 8000");
})