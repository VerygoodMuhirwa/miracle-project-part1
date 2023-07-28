const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports.createToken = async (user) => {
    let tokenAge = 60 * 60 * 24 * 10;
    const token = await jwt.sign(user.toJSON(), process.env.SECRET_KEY, {
        expiresIn: tokenAge,
    });
    return token;
};

module.exports.isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
// console.log(authorization);
    if (authorization) {
        const token1 = authorization.split(" ");
        const token=token1[1]
        
        jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
            if (err) {
                res.status(401).send({ message: 'Invalid Token' });
            } else {
                req.user = decode;
                next();
            }
        });
    } else {
        res.status(401).send({ message: 'No Token' });
    }
};