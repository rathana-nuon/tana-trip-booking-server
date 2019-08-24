module.exports = (sequelize, Sequelize) => {
    const District = sequelize.define('districts',{
        name:{
            type: Sequelize.STRING(100),
            allowNull: false
        },
        city_id:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return District;
}