const _ = require('lodash');
module.exports = {
    hasErrors : function (errors){
        return _.isEmpty(errors);
    },
}