const jwt = require('jsonwebtoken')

const mw = async function(req,res,next){
    try{
        let token = req.headers["x-api-key"]
        const decodedtoken = jwt.verify(token,"psiBorg")

        if(decodedtoken){
            req.userId = decodedtoken.userId
            next()
        }
        else{
            res.status(401).send({status:false , msg:"Token not valid"})
        }
    }
    catch(err){
        res.status(500).send({status:false , msg:err.msg})
    }
}

module.exports = {mw}