const express = require("express");
const router = express.Router();

const users = require("../controllers/users.controller.js") || {};
const employees = require("../controllers/employee.controller.js") || {};
const ppay802s = require("../controllers/ppay802s.controller.js") || {};
const ppai719as = require("../controllers/ppai719as.controller.js") || {};
const peis480ds = require("../controllers/peis480ds.controller.js") || {};
const certificates = require("../controllers/certificates.controller.js") || {};
const salaries = require("../controllers/salaries.controller.js") || {};
const ppay3403s = require("../controllers/ppay3403s.controller.js") || {};
const peis480hs = require("../controllers/peis480hs.controller.js") || {};
const ppai712s = require("../controllers/ppai712s.controller.js") || {};
const ppai713s = require("../controllers/ppai713s.controller.js") || {};
const ppai715s = require("../controllers/ppai715s.controller.js") || {};
const ppay121s = require("../controllers/ppay121s.controller.js") || {};
const ppay122s = require("../controllers/ppay122s.controller.js") || {};
const ppay125s = require("../controllers/ppay125s.controller.js") || {};
const ppay124s = require("../controllers/ppay124s.controller.js") || {};
const ppay127s = require("../controllers/ppay127s.controller.js") || {};
const pfrs860s = require("../controllers/pfrs860s.controller.js") || {};
const pfrs860sdetails = require("../controllers/pfrs860sdetails.controller.js") || {};
const purchaseOrders = require("../controllers/purchaseOrders.controller.js") || {};
const ppur301s = require("../controllers/ppur301s.controller.js") || {};
const lacp441s = require("../controllers/lacp441s.controller.js") || {};
const pofromvendor = require("../controllers/pofromvendor.controller.js") || {};

// Function to safely add routes only if controller functions exist
const safeRoute = (method, path, controllerFunction) => {
  if (controllerFunction) {
    router[method](path, controllerFunction);
  } else {
    console.warn(`⚠️ Skipping route ${method.toUpperCase()} ${path} - Controller function is missing`);
  }
};

// ✅ User Authentication Routes
safeRoute("post", "/auth", users.authenticate);

// ✅ User Management Routes
safeRoute("get", "/users", users.findAll);
safeRoute("post", "/users", users.create);
safeRoute("put", "/users/:email", users.update);
safeRoute("delete", "/users/:email", users.delete);

// ✅ Employee Routes
safeRoute("get", "/employees", employees.findAll);
safeRoute("get", "/employees/:id", employees.findOne);

// ✅ Payroll & Attendance Routes
safeRoute("get", "/attendance/:id", ppay802s.findAll);
safeRoute("get", "/attendancedetail/:id", ppai719as.findAll);
safeRoute("get", "/pfrs860s/:id", pfrs860s.findAll);
safeRoute("get", "/pfrs860sdetails/data", pfrs860sdetails.findAll);

// ✅ Miscellaneous Data Routes
safeRoute("get", "/miscdata/:id", peis480ds.findAll);
safeRoute("get", "/certificates/:id", certificates.findAll);
safeRoute("get", "/salaries/:id", salaries.findAll);
safeRoute("get", "/voldeductions/:id", ppay3403s.findAll);
safeRoute("get", "/tags/:id", peis480hs.findAll);
safeRoute("get", "/payroll/:id", ppai712s.findAll);
safeRoute("get", "/payrollCheck/", ppai713s.findAll);
safeRoute("get", "/payrollCheckDeductions/", ppai715s.findAll);

// ✅ Pay Codes & Job Codes Routes
safeRoute("get", "/ppay121s", ppay121s.findAll);
safeRoute("get", "/ppay122s", ppay122s.findAll);
safeRoute("get", "/ppay125s", ppay125s.findAll);
safeRoute("get", "/ppay124s", ppay124s.findAll);
safeRoute("get", "/ppay127s", ppay127s.findAll);

// ✅ Purchase Orders Routes
safeRoute("get", "/purchaseOrders/", purchaseOrders.findAll);
safeRoute("get", "/pofromvendor/", pofromvendor.findAll);

// ✅ Vendor Routes
safeRoute("get", "/lacp441s/", lacp441s.findAll);
safeRoute("get", "/ppur301s/", ppur301s.findAll);
safeRoute("get", "/ppur301s/:id", ppur301s.findOne);

// ✅ Attach router to the app
module.exports = (app) => {
  app.use("/api/employees", router);
};
