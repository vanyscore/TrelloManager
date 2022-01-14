const { Sequelize, DataTypes } = require("sequelize");
const { createHash } = require('crypto');
const roles = require("./roles");

const sequelize = new Sequelize('trello_manager_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

/// Описание сущности "Пользователей"
const User = sequelize.define('user', {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});

const UserInfo = sequelize.define('user_info', {
   userId: {
       type: DataTypes.INTEGER
   },
   email: {
       type: DataTypes.STRING
   }
}, {
    freezeTableName: true
});

const UserPassword = sequelize.define('user_password', {
    userId: {
        type: DataTypes.INTEGER
    },
    passwordHash: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

const InviteToken = sequelize.define('invite_token', {
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isActual: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    freezeTableName: true
});

sequelize.sync({
    force: false
}).then((seq) => {
    console.log('database synced');

    // Добавить админа если его нет в базе
    User.count({}).then(async function(n) {
        if (n === 0) {
            await User.create({
                fullName: 'Администратор',
                role: roles.admin
            }).then(() => {
                console.log('admin created')
            });

            const adminPassword = '12345678';
            const adminPasswordHash = createHash('SHA256')
                .update(adminPassword)
                .digest('hex');

            await UserPassword.create({
                userId: 1,
                passwordHash: adminPasswordHash
            });

            await UserInfo.create({
                userId: 1,
                email: 'admin@this.com'
            });

            console.log('admin created with passwordHash: ' + adminPasswordHash);
        }
    });

    return seq;
});

module.exports.sequalize = sequelize;
module.exports.User = User;
module.exports.UserPassword = UserPassword;
module.exports.UserInfo = UserInfo;
module.exports.InviteToken = InviteToken;