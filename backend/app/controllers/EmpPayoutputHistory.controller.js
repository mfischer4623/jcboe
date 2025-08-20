const db = require("../models");
const S3_EmpPayoutputHistory = db.S3_EmpPayoutputHistory;
const Op = db.Sequelize.Op;

// Retrieve all employees from the database.
exports.findAll = (req, res) => {
  const empNum = req.params.id;

  // Validate the input
  if (!empNum) {
    return res.status(400).send({ message: "Employee ID (SSN) is required." });
  }

  const condition = { empNum: (empNum) };
  const sortOrder = [["schoolYear", "ASC"]];

  S3_EmpPayoutputHistory.findAll({ where: condition, order: sortOrder })
    .then((data) => {
      if (!data.length) {
        return res.status(404).send({ message: "No W2 data found for this employee." });
      }
      res.send(data);
    })
    .catch((err) => {
      console.error("❌ Database error:", err);
      res.status(500).send({
        message: "Error retrieving W2 data.",
      });
    });
};;
