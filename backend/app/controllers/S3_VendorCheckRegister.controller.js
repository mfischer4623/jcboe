const db = require("../models");
const S3_VendorCheckRegister = db.S3_VendorCheckRegister;
const Op = db.Sequelize.Op;

// Find all vendor check register entries by vendorNumber
exports.findByVendorNumber = (req, res) => {
    const vendorNumber = req.params.vendorNumber;

    S3_VendorCheckRegister.findAll({ 
        where: { 
            vendorNumber: vendorNumber  // using alias from model
        },
        order: [ ['year', 'ASC'],    ['checkNumber', 'DESC']] // also using model field
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.error("Error in findByVendorNumber:", err);
        res.status(500).send({
            message: `Error retrieving vendor check register for vendorNumber ${vendorNumber}: ${err.message}`
        });
    });
};