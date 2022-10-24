const Sequelize=require("sequelize");
const sequelize=require("../DBConfig/db")
const FavouriteMovie=sequelize.define("favourite_movie",{
    id:
    {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false,
        unique: true,
        validate:{
            len: [0,8],
            notNull: true,
            notEmpty: true
        }

    },
    movie_name:
    {
        type:Sequelize.STRING,
        allowNull: false,
        validate:{
            len: [0,50],
            notNull: true,
            notEmpty: true
        }
    },
    rating:
    {
        type:Sequelize.INTEGER,
        allowNull: false,
        validate:{
            len: [0,5],
            notNull: true,
            notEmpty: true
        }
    },
    cast:
    {
        type:Sequelize.STRING,
        allowNull: false,
        validate:{
            len: [0,50],
            notNull: true,
            notEmpty: true
        }
    },
    genre:
    {
        type:Sequelize.STRING,
        allowNull: false,
        validate:{
            len: [0,50],
            notNull: true,
            notEmpty: true
        }
    },
    release_date:
    {
        type:Sequelize.DATEONLY,
        allowNull: false,
        validate:{
            len: [10],
            notNull: true,
            notEmpty: true
        }
    }
});
module.exports=FavouriteMovie;