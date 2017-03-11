/**
 * Created by GBC on 2017/3/10.
 */

'use strict';

var Sequelize  = require('sequelize');

let schemas = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    verAt: {
        type: Sequelize.STRING,
        allowNull: true
    },

}

let options = {
    freezeTableName: true,
    tableName: 'sms'
}

module.exports = function(sequelize) {
    return sequelize.define('sms', schemas, options);
}