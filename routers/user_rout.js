const express=require("express");
const userControl=require("../controllers/user_control");
const jwtVerfy=require("../middleware/jwtVerify");
const userRout=express();

//register user

userRout.post("/register",userControl.userRegister);

//user login 

userRout.post("/login",userControl.userLogin);

//adding favorite movie

userRout.post("/addfavoritemovie",jwtVerfy,userControl.favoriteMovieAdd);

//edit favorite movie

userRout.put("/editfavoritemovie",jwtVerfy,userControl.favoriteMovieEdit);

//delete favorite movie

userRout.delete("/deletefavoritemovie/:movie_name",jwtVerfy,userControl.favoriteMovieDelete);

//view favorite movie list

userRout.get("/viewfavoritemovie",jwtVerfy,userControl.favoriteMovieView);

module.exports=userRout;

