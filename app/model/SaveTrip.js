module.exports = (sequelize, Sequelize) => {

    const Save = sequelize.define('save_trips', {
        trip_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        group:{
            type: Sequelize.STRING(50),
            allowNull: true
        },
        save_by:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    
    return Save;
}