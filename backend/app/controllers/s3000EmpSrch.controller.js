const S3000payOutput = require("../models/s3000payOutput.model"); // Import model

// ✅ Find Employee by Employee Number
exports.findByEmpNum = async (req, res) => {
    try {
        const { emp_num } = req.params; // Get Employee Number from URL params
        const employee = await S3000payOutput.findOne({ where: { emp_num } });

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.json(employee); // Return found employee
    } catch (error) {
        console.error("Error fetching employee by number:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ✅ Find Employees by Last Name
exports.findByLastName = async (req, res) => {
    try {
        const { name } = req.query; // Get Last Name from query parameters
        if (!name) {
            return res.status(400).json({ message: "Last name is required" });
        }

        const employees = await S3000payOutput.findAll({ where: { lastname: name } });

        if (employees.length === 0) {
            return res.status(404).json({ message: "No employees found with that last name" });
        }

        res.json(employees); // Return array of employees
    } catch (error) {
        console.error("Error fetching employees by last name:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
