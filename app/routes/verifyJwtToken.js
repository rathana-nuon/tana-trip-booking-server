const jwt = require('jsonwebtoken');
const config = require('../config/config');
const db = require('../config/db.config');
const User = db.user;


verifyToken = (req, res, next) => {

    let token = req.headers['x-access-token'];
  
    if (!token){
        return res.status(403).send({ 
            auth: false, 
            message: 'No token provided.' 
        });
    }
    
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err){
            return res.status(500).send({ 
                auth: false, 
                message: 'Fail to Authentication. Error -> ' + err 
            });
        }
        req.userId = decoded.id;
        next();
    });

}

// middleware function to check for logged-in users
sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        return next();
    } else {
        return res.redirect('/tana-login');
    }    
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId)
    .then(user => {
        if(!user){
            res.status(403).send("Require Admin Role!");
            return;
        }
        if(user.role === 'admin'){
            next();
            return;
        }
    }).catch(e => {
        return res.status(500).json(e);
    });
}

isPartner = (req, res, next) => {
    User.findByPk(req.userId)
    .then(user => {
        if(!user){
            res.status(403).send("Require Partner Role!");
            return;
        }
        if(user.role === 'partner'){
            next();
            return;
        }
    }).catch(e => {
        return res.status(500).json(e);
    });
}

const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.sessionChecker = sessionChecker;
module.exports = authJwt;
