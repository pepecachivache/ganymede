const _ = require('lodash');
const { hasErrors } = require('./errorsChecker')

module.exports = {
    
    validateOrder : function(order){
        
        let errors = {};
        
        order.query = !_.isEmpty(order.query) ? order.query : '';
        order.provider = !_.isEmpty(order.provider) ? order.provider : '' ;
        order.options.user = !_.isEmpty(order.options.user) ? order.options.user : '';
        order.options.password = !_.isEmpty(order.options.password) ? order.options.password : '';
        order.callbackurl = !_.isEmpty(order.callbackUrl) ? order.callbackUrl : '' ;
        
        
        if(_.isEmpty(order.query))
        errors.query = 'Query cannot be empty';
        
        if(_.isEmpty(order.provider))
        errors.provider = 'Provider cannot be empty';
        
        if(_.isEmpty(order.options.user))
        errors.user = 'User cannot be empty';
        
        if(_.isEmpty(order.options.password))
        errors.password = 'Password cannot be empty';
        
        if(_.isEmpty(order.callbackurl))
        errors.callbackurl = 'CallbackUrl cannot be empty';
        
        return {
            errors,
            isValid: hasErrors(errors)    
        }
    }
}