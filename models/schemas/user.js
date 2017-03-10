/**
 * Created by GBC on 2017/3/7.
 */

'use strict';

var Sequelize  = require('sequelize');

let schemas = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nick_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    openid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true
    }
}

let options = {
    freezeTableName: true,
    tableName: 'user'
}

module.exports = function(sequelize) {
    return sequelize.define('user', schemas, options);
}