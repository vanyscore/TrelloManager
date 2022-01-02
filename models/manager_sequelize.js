const { Sequelize, DataTypes } = require("sequelize");
const roles = require("./roles");

const sequelize = new Sequelize('trello_manager_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

/// Описание сущности "Пользователей"
const User = sequelize.define('users', {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

sequelize.sync({
    force: true
}).then((seq) => {
    console.log('database synced');

    // Добавить админа если его нет в базе
    User.count({}).then((n) => {
        if (n === 0) {
            User.create({
                fullName: 'Администратор',
                role: roles.admin
            }).then(() => {
                console.log('admin created')
            });
        }
    });

    return seq;
});

module.exports.sequalize = sequelize;
module.exports.User = User;