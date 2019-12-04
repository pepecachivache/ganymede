const mongoose = require('mongoose');
const {Schema} = mongoose;
const ordersSchema = new Schema({
    order: { 
        query: {
          type: String,
          required: true
        },
        provider: {
          type: String,
          required: true
        },
        options: {
          user: {
            type: String,
            required: true
          },
          password: {
            type: String,
            required: true
          } },
          callbackurl: {
            type: String,
            required: true
          }
        },
      status: {
        type: String,
        default: 'received'
      },
      results:{
        type: Array,
      }

},{versionKey: false})

    
module.exports = mongoose.model('Order', ordersSchema);
