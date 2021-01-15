module.exports = function (sequelize, Sequelize){
     const User = sequelize.define('user_n', {
        id_user: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
        email :{type: Sequelize.STRING, notEmpty: true},
        password: {type: Sequelize.STRING, allowNull: false},
        photo:{type: Sequelize.STRING},
        login_type:{type: Sequelize.STRING},
        status: {type: Sequelize.ENUM ('active', 'inactive'), defaultValue: 'active'}
     });
     return User;
}