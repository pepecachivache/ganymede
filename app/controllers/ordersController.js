const Orders = require('../models/Order');
const User = require('../models/User');
const _ = require('lodash');
const axios = require('axios');
const { validateOrder } = require('../utils/validations');

module.exports = {
    //check / save order to send to Themisto app
    saveOrders : function (req,res){
        let url = "";
        const {errors, isValid} = validateOrder(req.body);
        
        if(!isValid)
        res.json(errors).status(400)
        
        //User validation
        let user = req.body.options.user;
        let pass = req.body.options.password
        if(!_.isEmpty(user) && !_.isEmpty(pass) ){
            User.findOne({user: user, password: pass},(err, user)=>{
                if(_.isNull(user))
                res.json("User or password invalid")
                
                else {   
                    const orderObj = {
                        query : req.body.query,
                        provider: req.body.provider,
                        options: req.body.options,
                        callbackurl: req.body.callbackUrl
                    };    
                    const newOrd = new Orders({
                        order: orderObj     
                    })
                    // setting url, NODE_ENV depends on ambient.
                  
                    switch(process.env.NODE_ENV){      
                        case 'development':
                        url = 'http://localhost:4000/api/process';
                        break;
                        case 'production':
                        url = 'https://themistos.herokuapp.com/api/process';
                        break; 
                    }
                    
                    newOrd.save()
                    .then(newOrd => 
                        axios
                        .post(url, newOrd)
                        .then((resp) => 
                        Orders.findByIdAndUpdate( resp.data._id,
                            {$set:{ status: 'processing'}}, 
                            (err, response ) => {
                                if (err) {
                                    res.json(err);
                                }
                                res.json(response).status(200);
                            }
                        )
                    )
                    .catch(err => console.log(err))
                )
                .catch(err => console.log(err))
            }         
        })
    }
    
},
results: function (req,res){
    // check ambient to send order
    let url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/product/search-order/': 'https://ganymede.herokuapp.com/api/product/search-order/';
    let id = req.body._id;
    Orders.findById(id ,(err, ord) =>{
        if(err)
        res.send(err)
        else{ 
            if(ord.status === 'fullfilled'){
                console.log(url+`${ord._id}`)
                //res.json(url+`${ord._id}`).status(200)
            }
            else{
                console.log(ord.status)
                //res.json(ord.status)
            }
        }    
    })
    
},
//check  and update order from Themisto
checkOrder: function(req, res){
    if(_.isEmpty(req.body.results))
    status = 'failed';
    else
    status = 'fullfilled';
    
    let resultObj = {
        id: req.body._id,
        status: status,
        results: req.body.results
    }        
    Orders.findByIdAndUpdate(resultObj.id,resultObj,{new: true},(err, result) => {
        if(err)
        res.json(err);
        else {
            //send updated order data to callback
            axios
            .post(result.order.callbackurl,result)
            .then(res => res.json("Sending data to callback"))
            .catch(err => console.log(err))
        }      
    })
},
//get one order
getOrder: function(req,res){
    const id = req.params.id;
    Orders.findById(id, (err,ord) =>{
        if(err)
        res.json("Order ID not found in database").status(400);
        else
        res.json(ord).status(200)
    })
},
//get all orders
getAllOrders: function(req,res){
    
    Orders.find((err,ords) =>{
        if(err)
        res.json(err).status(400);
        else
        res.json(ords).status(200);
    })
},

//get order by category
getByCategory: function(req, res){
    
    const category = req.params.category;
    Orders.find({category: category },(err,ords) =>{
        if(err)
        res.json(err).status(400);
        else
        res.send(ords);
    })
}


}



