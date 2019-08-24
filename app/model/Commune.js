module.exports = (sequelize, Sequelize) => {
    const Commune = sequelize.define('communes',{
        name:{
            type: Sequelize.STRING(100),
            allowNull: false
        },
        district_id:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return Commune;
}