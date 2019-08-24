const db = require('../config/db.config');
const config = require('../config/config');
const Op = db.Sequelize.Op;

// import model
const Location = db.location;
const Place = db.place;
const City = db.city;
const District = db.district;
const Commune = db.commune;
const Village = db.village;

// function
exports.lists = (req, res) => {
    Place.findAll({
        include:[
            {
                model: Location,
                required: true,
                attributes:['id', 'street', 'zip', 'lat', 'lng'],
                include:[
                    {
                        model: City,
                        required: true,
                        attributes:['name']
                    },
                    {
                        model: District,
                        required: true,
                        attributes:['name']
                    },
                    {
                        model: Commune,
                        required: true,
                        attributes:['name']
                    },
                    {
                        model: Village,
                        required: true,
                        attributes:['name']
                    },
                ]
            }
        ]
    })
    .then(places => {
        return res.json(200, places);
    }).catch(e => {
        return res.json(500, e);
    });
}

exports.show = (req, res) => {
    Place.findOne({
        where: {id: req.params.id},
        include:[
            {
                model: Location,
                required: true,
                attributes:['id', 'street', 'zip', 'lat', 'lng'],
                include:[
                    {
                        model: City,
                        required: true,
                        attributes:['name']
                    },
                    {
                        model: District,
                        required: true,
                        attributes:['name']
                    },
                    {
                        model: Commune,
                        required: true,
                        attributes:['name']
                    },
                    {
                        model: Village,
                        required: true,
                        attributes:['name']
                    },
                ]
            }
        ]
    })
    .then(place => {
        if(!place) return res.json(404, 'Place Not Found');
        return res.json(200, place);
    })
    .catch(e => {
        res.json(500, e);
    });
}

exports.create = (req, res) => {

}

exports.update = (req, res) => {

}

exports.delete = (req, res) => {
    Place.destroy({
        where:{id: req.params.id}
    })
    .then(deletedRecord => {
        if(deletedRecord != 1) res.status(404).json({message:"record not found"});
        res.status(200).json({message:"Deleted successfully"});
    })
    .catch(e => {
        res.status(500).json(e);
    });
}