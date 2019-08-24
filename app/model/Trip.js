module.exports = (sequelize, Sequelize) => {
    const Trip = sequelize.define('trips',{
        post_by:{
            type: Sequelize.INTEGER,
            allowNull: false
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
        location:{
            type: Sequelize.STRING(100),
            allowNull: false
        },
        count_place:{
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        status:{
            type: Sequelize.STRING(50),
            allowNull: true,
            defaultValue: 'new'
        },
        active:{
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    });
    return Trip;
}