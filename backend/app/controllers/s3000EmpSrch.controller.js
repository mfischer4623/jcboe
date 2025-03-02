const db = require("../models"); 
const S3000payOutput = db.s3000payOutput; 

// ✅ Find Employee by Employee Number
exports.findOne = async (req, res) => {
    try {
        const { emp_num } = req.params;
        console.log("Received request for employee number:", emp_num); // Debugging log

        const employee = await S3000payOutput.findOne({ where: { emp_num } });

        if (!employee) {
            console.warn("Employee not found for ID:", emp_num);
            return res.status(404).json({ message: "Employee not found" });
        }

        res.json(employee);
    } catch (error) {
        console.error("Error fetching employee by number:", error);
        res.status(500).json({ message: "Server error", error: error.message || error });
    }
};

// ✅ Find Employees by Last Name
exports.findAll = async (req, res) => {
    try {
        const { name } = req.query;
        console.log("Received request for employees with last name:", name);

        if (!name) {
            console.warn("Last name is required but not provided.");
            return res.status(400).json({ message: "Last name is required" });
        }

        const employees = await S3000payOutput.findAll({ where: { lastname: name } });

        if (employees.length === 0) {
            console.warn("No employees found with last name:", name);
            return res.status(404).json({ message: "No employees found with that last name" });
        }

        res.json(employees);
    } catch (error) {
        console.error("Error fetching employees by last name:", error);
        res.status(500).json({ message: "Server error", error: error.message || error });
    }
};
