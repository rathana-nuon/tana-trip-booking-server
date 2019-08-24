module.exports = (sequelize, Sequelize) => {

    const Like = sequelize.define('like_trips', {
        trip_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        like_by:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    
    return Like;
}