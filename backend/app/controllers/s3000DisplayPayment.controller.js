const { Op } = require("sequelize");
const db = require("../models");
const S3000checkReports = db.s3000checkReports;

exports.findAllByCheck = async (req, res) => {
    try {
        const { chknum, chkdate } = req.params;
        console.log(`Received request for chknum: ${chknum}, chkdate: ${chkdate}`);

        const payments = await S3000checkReports.findAll({
            where: {
                chknum: chknum,
                chkdate: chkdate
            }
        });

        if (!payments.length) {
            return res.status(404).json({ message: "No payments found for this check number and date." });
        }

        res.json(payments);
    } catch (error) {
        console.error("Error fetching payment details:", error);
        res.status(500).json({ message: "Server error" });
    }
};
