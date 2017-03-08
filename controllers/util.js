/**
 * Created by GBC on 2017/3/7.
 */

'use strict';

module.exports = exports = function(req, res) {
    return {
        sendError: function(err) {
            console.log(err);
            res.send({
                success: false,
                error: {
                    message: err.message,
                    stack: err.stack,
                }
            });
        }
    }
};