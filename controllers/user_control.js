const User=require("../models/user");
const FavouriteMovie=require("../models/favourite_movie");
const crypt=require("bcrypt");
const JWT=require("jsonwebtoken");
const { Op } = require("sequelize");

module.exports={

    
    userRegister:(req,res)=>{
        //  User.findOne({
        //      where:{user_name:req.body.user_name}
        //  })
        //  .then((result)=>{
        //      if(result)
        //      {  
        //           res.status(404).send("user alredy exists");
        //           return;
        //      }
            User.findOne({ 
                //  where:{email:req.body.email}
                where: {
					[Op.or]: [
						{user_name:req.body.user_name},
						{email:req.body.email}
					]
				}
            })
            .then((result)=>{
                console.log(result)
                console.log(req.body)
                if(result)
                {  
                     res.status(404).send("user alredy exists");
                     return;
                }
                else if(req.body.user_name.length==0)
                {
                    res.status(404).send("please enter the User Name")
                }
                else if(req.body.password.length==0)
                {
                    res.status(404).send("please enter the password")
                }
                else if(req.body.full_name.length==0)
                {
                    res.status(404).send("please enter the Full Name")
                }
                else if(req.body.email.length===0)
                {
                    res.status(404).send("please enter the Email ID")
                }
                else
                {
                const pass=req.body.password;
                const saltround=10;
                const salt=crypt.genSalt(saltround,(err,salt)=>{
                    if(err)
                    {
                        res.status(404).send("somthing went worng");
                        console.log("error while generating salt");
                    }
                    else
                    {
                        const hash=crypt.hash(pass,salt,(err,hash)=>{
                            if(err)
                            {
                                res.status(404).send("somthing went worng");
                                console.log("error while hash");
                            }
        
                            else
                            {
                                User.create({
                                    user_name:req.body.user_name,
                                    password:hash,
                                    full_name:req.body.full_name,
                                    email:req.body.email
                                })
                                .then((result)=>{
                                    res.status(201).send(result);
                                })
                                .catch((err)=>{
                                    res.status(404).send(err);
                                })
                            }
        
                        })
                    }
                    })
                }
            })   
        // })
        .catch((err)=>{
            res.status(404).send(err);
        })

    },

    userLogin:(req,res)=>{
        User.findOne({
            where:
            {
                user_name:req.body.user_name,
            }
        })
        .then((result)=>{
            if(req.body.user_name.length===0)
            {
                res.status(404).send("please enter the username")
            }
            else
            {
                if(result)
                {
                    const hash=result.password;
                    const pass=req.body.password;

                    if(pass.length===0)
                        {
                            res.status(404).send("please enter the password")
                        }
                    else
                        {
                            crypt.compare(pass,hash,(err,dcrypt)=>
                                {
                                    if(dcrypt)
                                        {
                                            const token=JWT.sign({
                                            id:result.id,
                                            user_name:result.user_name,
                                            password:result.password,
                                            full_name:result.full_name,
                                            email:result.email
                                            },"bala",{expiresIn:"1hr"})
                                            res.status(200).send(token);
                                        }
                                    else
                                        {
                                            res.status(404).send("wrong password");
                                        }
                                })
                        }   
                }
            else
                {
                    res.status(404).send("usernot found");
                }
            }

        })
        .catch((err)=>{
            res.status(404).send(err);
        })
    },

    favoriteMovieAdd:(req,res)=>
    {
        FavouriteMovie.findOne({
            where: {
                [Op.or]: [
                    {userId:req.id},
                    {movie_name:req.body.movie_name}
                ]
            }
            // where:{userId:req.id},
            // where:{movie_name:req.body.movie_name}
        })
        .then((result)=>{
            if(result)
            {  
                res.status(404).send("already in Favourite Movie List");
            }
            else
            {
                FavouriteMovie.create({
                    movie_name:req.body.movie_name,
                    rating:req.body.rating,
                    cast:req.body.cast,
                    genre:req.body.genre,
                    release_date:req.body.release_date,
                    userId:req.id
                })
                .then((result)=>{
                    res.status(200).send(result);
                })
            }
        })
        .catch((err)=>{
            res.status(404).send(err);
        })
    },

    favoriteMovieEdit:(req,res)=>
    {
        FavouriteMovie.findOne({
            where: {
                [Op.or]: [
                    {userId:req.id},
                    {movie_name:req.query.movie_name}
                ]
            }
            // where:{userId:req.id},
            // where:{movie_name:req.query.movie_name}
        })
        .then((result)=>{
            if(result)
            {
                FavouriteMovie.update({
                    movie_name:req.body.movie_name,
                    rating:req.body.rating,
                    cast:req.body.cast,
                    genre:req.body.genre,
                    release_date:req.body.release_date,
                    userId:req.id
                },{
                    where: {id:result.id}
                })
                res.status(200).send("updated favorite list")
            }
            else 
            {
                res.status(404).send("invalid data")
            }
        })
        .catch((err)=>{
            res.status(404).send(err)
        })
    },

    favoriteMovieDelete:(req,res)=>{
        FavouriteMovie.findOne({
            where: {
                [Op.or]: [
                    {userId:req.id},
                    {movie_name:req.params.movie_name}
                ]
            }
                // where:{userId:req.id},
                // where:{movie_name:req.params.movie_name}

        })
        .then((result)=>{
            if(result)
            {
                FavouriteMovie.destroy({  
                    where: {id:result.id}
                })
                res.status(200).send("removed from favorite list")
            }
            else 
            {
                res.status(404).send("invalid data")
            }
        })
        .catch((err)=>{
            res.status(404).send(err)
        })
    },

    favoriteMovieView:(req,res)=>{
        FavouriteMovie.findAll({
            where:{userId:req.id}
        })
        .then((result)=>{
            res.status(200).send(result)
        })
        .catch((err)=>{
            res.status(404).send(err)
        })
    }
    
}


// FavouriteMovie.update({
    // movie_name:req.body.movie_name,
    // rating:req.body.rating,
    // cast:req.body.cast,
    // genre:req.body.genre,
    // release_date:req.body.release_date,
    // userId:req.id
// },{
//     where:{userId:req.id},
//     where:{movie_name:req.params.movie_name}
// })
// .then((result)=>{
//     res.status(200).send("update movie details")
// })
// .catch((err)=>{
//     res.status(404).send(err)
// })