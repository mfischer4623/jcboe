const db = require("../models");
const S3_PurchaseOrders = db.S3_PurchaseOrders;
const Op = db.Sequelize.Op;

// Find all purchase orders by vendorNumber
exports.findByVendorNumber = (req, res) => {
    const vendorNumber = req.params.vendorNumber;

    S3_PurchaseOrders.findAll({ 
        where: { 
            vendorNumber: vendorNumber  // ✅ Use model field name
        },
        order: [
             ['year', 'ASC'],       // first order by year
            ['poNumber', 'ASC']]   // ✅ Use model field name
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.error("Error in findByVendorNumber:", err);
        res.status(500).send({
            message: `Error retrieving purchase orders for Vendor # ${vendorNumber}: ${err.message}`
        });
    });
};