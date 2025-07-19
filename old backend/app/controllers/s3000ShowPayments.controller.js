const { Op, Sequelize } = require("sequelize");
const db = require("../models");
const S3000checkReports = db.s3000checkReports;

exports.findAll = async (req, res) => {
    try {
        const { employeeNumber } = req.params;
        console.log("Received request for payments emp number:", employeeNumber);

        const payments = await S3000checkReports.findAll({
            attributes: [
                'chknum',
                'chkdate',
                [Sequelize.fn('MAX', Sequelize.col('chkvdate')), 'chkvdate'],
                [Sequelize.fn('MAX', Sequelize.col('chkrun')), 'chkrun'],
                [Sequelize.fn('MAX', Sequelize.col('status')), 'status'],
                [Sequelize.fn('MAX', Sequelize.col('gwages')), 'gwages'],
                [Sequelize.fn('MAX', Sequelize.col('newwages')), 'newwages']
            ],
            where: { employeenum: employeeNumber },
            group: ['chknum', 'chkdate'],
            order: [['chknum', 'ASC'], ['chkdate', 'ASC']],
        });

        if (!payments.length) {
            return res.status(404).json({ message: "No payments found for this employee." });
        }

        res.json(payments);
    } catch (error) {
        console.error("Error fetching payments:", error);
        res.status(500).json({ message: "Server error" });
    }
};
