/**
 * Created by GBC on 2017/3/7.
 */

'use strict';

module.exports = function (app, sequelize) {
    app.model = {};

    var User = require('./schemas/user')(sequelize);
    var Sms = require('./schemas/sms')(sequelize);

    app.model['User'] = User;
    app.model['Sms'] = Sms;

    // 建立关系
}