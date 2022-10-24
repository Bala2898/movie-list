const Sequelize=require("sequelize");
const sequelize=new Sequelize("moviesdev","root","bala",{
    dialect:"mysql",
    host:"localhost"
});
module.exports=sequelize;