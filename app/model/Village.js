module.exports = (sequelize, Sequelize) => {
    const Village = sequelize.define('villages',{
        name:{
            type: Sequelize.STRING(100),
            allowNull: false
        },
        commune_id:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return Village;
}