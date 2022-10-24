const JWT=require("jsonwebtoken");
module.exports=(req,res,next)=>
    {
        try 
        {
            const token=req.headers["access-token"];
            const verify=JWT.verify(token,"bala");
            req.id=verify.id
            next();
        } 
        catch (error) 
        {
            res.status(404).send("auth failed")
        }
        
    }