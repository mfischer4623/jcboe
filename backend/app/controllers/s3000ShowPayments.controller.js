const db = require("../models");
const S3000checkReports = db.s3000checkReports;

// Define the findAll function
exports.findAll = async (req, res) => {
    try {
        const { employeeNumber } = req.params;
        console.log("Received request for payments emp number:", employeeNumber);

        const payments = await S3000checkReports.findAll({
            where: { employeenum: employeeNumber },
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