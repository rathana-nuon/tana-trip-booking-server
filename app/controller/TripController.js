const db = require('../config/db.config');
const Op = db.Sequelize.Op;

const Trip = db.trip;
const Place = db.place;
const User = db.user;


exports.lists = (req, res) => {
    Trip.findAll().then(trip => {
        res.json(trip);
    });
}

exports.show = (req, res) => {
    Trip.findOne(
        {   
            where: { id: req.params.id },
            include:[User],
            include:[Place]
        }
    ).then( trip => {
        res.json(trip);
    });
}

exports.create = (req, res) => {

}

exports.update = (req, res) => {

}

exports.delete = (req, res) => {
    
}