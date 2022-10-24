const Sequelize=require("sequelize");
const sequelize=require("../DBConfig/db")
const User=sequelize.define("user",{

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
    user_name:
    {
        type:Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate:{
            len: [0,50],
            notNull: true,
            notEmpty: true
        }
    },
    password:
    {
        type:Sequelize.STRING,
        allowNull: false,
        validate:{
            notNull: true,
            notEmpty: true
        }
    },
    full_name:
    {
        type:Sequelize.STRING,
        allowNull: false,
        validate:{
            len: [0,50],
            notNull: true,
            notEmpty: true
        }
    },
    email:
    {
        type:Sequelize.STRING,
        allowNull: false,
        validate:{
            len: [0,50],
            notNull: true,
            notEmpty: true,
            isEmail: true
        }
    }
});
module.exports=User;



