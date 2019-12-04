const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController')

router.post('/product/search', ordersController.saveOrders);
router.get('/product/search-order/:id', ordersController.getOrder);
router.get('/product/search-orders', ordersController.getAllOrders);
router.get('/product/category/:category', ordersController.getByCategory);
router.post('/orders/check', ordersController.checkOrder);
router.post('/results', ordersController.results);


module.exports = router;




