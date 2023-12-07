const express = require("express");
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    try {
        let data = [{ Order_data: req.body.order_data }]; // Assuming you want to wrap order_data in an object
        let eId = await Order.findOne({ 'email': req.body.email });

        if (eId === null) {
            await Order.create({
                email: req.body.email,
                order_data: data
            });
            res.json({ success: true });
        } else {
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data }});
            res.json({ success: true });
        }
    } catch (error) {
        console.error("Error in /orderData:", error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});

router.post('/myorderData', async (req, res) => {
    try {
        let myData = await Order.findOne({ 'email': req.body.email });
        res.json({ orderData: myData });
    } catch (error) {
        console.error("Error in /myorderData:", error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});

module.exports = router;