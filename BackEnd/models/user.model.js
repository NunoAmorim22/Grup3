/*module.exports = function (sequelize, Sequelize){
     const User = sequelize.define('User', {
        id_user: { autoIncrement: true, primaryKey: true, type: sequelize.INTEGER},
        email :{type: Sequelize.STRING, notEmpty: true},
        password: {type: Sequelize.STRING, allowNull: false},
        photo:{type: Sequelize.STRING},
        login_type:{type: Sequelize.STRING},
        status: {type: Sequelize.ENUM ('active', 'inactive'), defaultValue: 'active'}
     });
     return User;
}*/