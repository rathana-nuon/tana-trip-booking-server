module.exports = (sequelize, Sequelize) => {
    const Location = sequelize.define('locations',{
        place_id:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        street:{
            type: Sequelize.STRING(100),
            allowNull: false
        },
        village_id:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        commune_id:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        district_id:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        city_id:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        zip:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        lat:{
            type: Sequelize.DECIMAL(7,2),
            allowNull: true
        },
        lng:{
            type: Sequelize.DECIMAL(7,2),
            allowNull: true
        }
    });
    return Location;
}