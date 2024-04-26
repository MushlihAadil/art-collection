const {User} = require('../models');
const {comparePassword, hashPassword} = require('../helper/bcrypt')
const {createToken} = require('../helper/jwt')

class UserController {
    static async register (req, res, next) {
        try {
            const {email, password, username} = req.body;
            // console.log(req.body);

            const user = await User.create({email, password, username});
            
            res.status(201).json({
                email: user.email,
                username: user.username,
            })
        } catch (err) {
          next(err)  
        }
    }

    static async login (req, res, next) {
        try {
            const {email, password, username} = req.body;
            if (!email && !username || !password) throw {name: 'InvalidLoginInput'}

            let user;
            if (email) {
                user = await User.findOne({where: {email: email}});
            } else if (username) {
                user = await User.findOne({where: {username: username}});
            }

            if (!user) throw {name: 'InvalidUserInput'}

            let passwordCompare = comparePassword(password, user.password);

            if (!user || !passwordCompare) throw {name: 'InvalidUserInput'}


            let tokenUser = createToken({
                id: user.id
            });

            res.status(200).json({
                email: user.email,
                username: user.username,
                accsess_token: tokenUser,
                message: 'Login Success'
            })
        } catch (err) {
          next(err)  
        }
    }
}

module.exports = UserController;