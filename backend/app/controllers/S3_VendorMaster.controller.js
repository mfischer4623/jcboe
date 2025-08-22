const db = require("../models");
const S3_VendorMaster = db.S3_VendorMaster;
const Op = db.Sequelize.Op;

// Find a single vendor by Vendor #
// Find a single vendor by vendorNumber
exports.findByVendorNumber = (req, res) => {
    const vendorNumber = req.params.vendorNumber;
    const sortOrder = [['indexName', 'ASC']];
    S3_VendorMaster.findOne({
        where: {
            vendorNumber: vendorNumber
        },
        order: sortOrder
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.error("Error in findByVendorNumber:", err);
            res.status(500).send({
                message: `Error retrieving vendor with Vendor Number: ${vendorNumber}: ${err.message}`
            });
        });
};

// Find vendors by indexName (supports partial matching)
exports.findByIndexName = (req, res) => {
    const indexName = req.query.indexName;

    const condition = indexName ? { indexName: { [Op.like]: `%${indexName}%` } } : null;
    const sortOrder = [['indexName', 'ASC']];

    S3_VendorMaster.findAll({
        where: condition,
        order: sortOrder
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.error("Error in findByIndexName:", err);
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving vendors by index name."
            });
        });
};