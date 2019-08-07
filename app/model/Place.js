module.exports = (sequelize, Sequelize) => {
    const Place = sequelize.define('places',{
        user_id:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        trip_id:{
            type: Sequelize.INTEGER,
            allowNull: true
        },
        name:{
            type: Sequelize.STRING(100),
            allowNull: false
        },
        description:{
            type: Sequelize.TEXT,
            allowNull: true
        },
        featured_image:{
            type: Sequelize.TEXT,
            allowNull: true
        },
        rating:{
            type: Sequelize.DOUBLE,
            defaultValue: 0
        },
        reviews:{
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        active:{
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });
    return Place;
}