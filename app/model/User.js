module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        name: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        username: {
            type: Sequelize.STRING(50),
            allowNull: false 
        },
        email: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        password: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        profile:{
            type: Sequelize.TEXT,
            allowNull: false
        },
        role:{
            type: Sequelize.STRING(20),
            defaultValue: 'user'
        },
        connect:{
            type: Sequelize.STRING(20),
        },
        active:{
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });
    
    return User;
}