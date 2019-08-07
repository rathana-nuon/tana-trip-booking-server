const db = require('../config/db.config');
const config = require('../config/config');
const User = db.user;

const Op = db.Sequelize.Op;
 
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


exports.signIn = (req,res) => {
    User.findOne({
        where:{
            email: req.body.email
        }
    }).then(user => {

        if(!user){
            return res.status(404).send({ message: 'User Not Found.' });
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
            return res.status(401).json({
                auth: false,
                token: null, 
                message: 'Invalid Password!'
            });
        }

        var token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 604800
        });

        if(user.role != 'user'){
            return res.status(401).json({
                auth: false,
                token: null, 
                message: 'You cannot signin'
            });
        }

        res.status(200).json({
            auth: true,
            token: token,
            message: user.name,
        });

    }).catch(err => {
        res.status(500).json({ reason: err.message });
    });
}

exports.signUp = (req, res) => {
    // Save User to Database
    User.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        profile: req.body.profile
    }).then(user => {
        console.log(user);
        res.json({ message: 'Registered successfully!' });
    }).catch(err => {
        res.status(500).json({ reason: err.message });
    });
}

exports.getUser = (req, res) => {

    User.findOne({
        where:{
            id: req.userId
        },
        attributes: ['id', 'name', 'username', 'email', 'profile']
    }).then(user => {
        if(!user){
            return res.status(404).send({ message: 'User Not Found.' });
        }
        res.status(200).json(user);
    }).catch(err => {
        res.status(500).json({ reason: err.message });
    });

}