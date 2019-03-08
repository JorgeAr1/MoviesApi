var jwt = require('jsonwebtoken')
var blacklist = [] ;
function verifyToken(req, res, next){
    var secret = "SuperSecretKey";
    var token = req.headers['authorization']
    if(blacklist.includes(token)){
        return res.status(500).send({auth: false, message: "Token not valid"})
    }
    if(!token)
        return res.status(403).send({auth: false, message: "No token"})
    jwt.verify(token, secret, (err, decoded) => {
        if(err)
            return res.status(500).send({auth: false, message: "Token not valid"})
        req.user = decoded;
        next();
    })
}

module.exports = verifyToken;