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
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}

let options = {
    freezeTableName: true,
    tableName: 'user'
}

module.exports = function(sequelize) {
    return sequelize.define('user', schemas, options);
}