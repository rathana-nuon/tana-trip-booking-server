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
        active:{
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });
    return Trip;
}