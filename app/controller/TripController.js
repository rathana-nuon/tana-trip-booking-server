const db = require('../config/db.config');
const Op = db.Sequelize.Op;

const Trip = db.trip;
const LikeTrip = db.likeTrip;
const SaveTrip = db.saveTrip;
const Place = db.place;
const User = db.user;
const Location = db.location;


exports.lists = (req, res) => {
	
	if(req.query.show){
		Trip.findAll({
			where:{
				status: req.query.show
			},
			include:[
				{
					model: User,
					required: true,
					attributes:['name', 'profile', 'count_post']
				},
			],
			order:[['id', 'DESC']]
		}).then(trips => {
			return res.status(200).json(trips);
		}).catch(e => {
			return res.status(500).json(e);
		});
	}else{
		Trip.findAll({
			include:[
				{
					model: User,
					required: true,
					attributes:['name', 'profile', 'count_post']
				},
			],
			order:[['id', 'DESC']]
		}).then(trips => {
			return res.status(200).json(trips);
		}).catch(e => {
			return res.status(500).json(e);
		});
	}
	
}

exports.show = (req, res) => {
	Trip.findOne(
		{   
			
			where: { id: req.params.id },
			include:[
				{
					model: User,
					required: true,
					attributes:['name', 'profile', 'count_post']
				},
				{
					model: LikeTrip,
					required: true,
					attributes: [
						'trip_id', 
						[
							db.sequelize.fn('count', 
							db.sequelize.col('like_trips.trip_id')), 
							'likes_count'
						]
					],
				},
				{
					model: SaveTrip,
					required: true,
					attributes: [
						[
							db.sequelize.fn('count',
							db.sequelize.col('save_trips.trip_id')),
							'save_count'
						]
					]
				},
				{
					model: Place,
					required: true,
					include:[
						{
							model: Location,
							required: true,
							attributes:['lat', 'lng']
						},
						
					]
				}
			],
			order:[['id', 'DESC']]
		}
	).then(trip => {
		if(!trip){
			return res.status(404).json({message: 'Trip not found.'});
		}
		return res.status(200).json(trip);
	}).catch(e => {
		return res.status(500).json(e);
	});
}


exports.create = (req, res) => {

}

exports.update = (req, res) => {

}

exports.delete = (req, res) => {
	
}