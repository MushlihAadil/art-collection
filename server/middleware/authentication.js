const { verifyToken } = require('../helper/jwt');
const { User } = require('../models');  

const authentication = async (req, res, next) => {
    try {
        let access_token = req.headers.authorization;
        if (!access_token) throw {name: "InvalidToken"}

        let tokenSplit = access_token.split(" ") ;
        let [bearer, token] = tokenSplit
        if (bearer !== "Bearer") throw {name: "InvalidToken"} 

        let payload = verifyToken(token)
        let user = await User.findByPk(payload.id)
        if (!user) throw {name: "InvalidToken"}

        // console.log(user)
        req.user = {
            id : user.id,
        }
        
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = authentication;