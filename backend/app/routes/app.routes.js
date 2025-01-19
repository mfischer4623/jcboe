module.exports = (app) => {
    const employees = require("../controllers/employee.controller.js");
    const ppay802s = require("../controllers/ppay802s.controller.js");
    const ppai719as = require("../controllers/ppai719as.controller.js");
    const peis480ds = require("../controllers/peis480ds.controller.js");
    const certificates = require("../controllers/certificates.controller.js");
    const salaries = require("../controllers/salaries.controller.js");
    const ppay3403s = require("../controllers/ppay3403s.controller.js");
    const peis480hs = require("../controllers/peis480hs.controller.js");
    const ppai712s = require("../controllers/ppai712s.controller.js");
    const ppai713s = require("../controllers/ppai713s.controller.js");
    const ppai715s = require("../controllers/ppai715s.controller.js");
    const ppay121s = require("../controllers/ppay121s.controller.js");
    const ppay122s = require("../controllers/ppay122s.controller.js");
    const ppay125s = require("../controllers/ppay125s.controller.js");
    const ppay124s = require("../controllers/ppay124s.controller.js");
    const ppay127s = require("../controllers/ppay127s.controller.js");
    const pfrs860s = require("../controllers/pfrs860s.controller.js");
    const pfrs860sdetails = require("../controllers/pfrs860sdetails.controller.js");
    const purchaseOrders = require("../controllers/purchaseOrders.controller.js");
    const ppur301s = require("../controllers/ppur301s.controller.js");
    const lacp441s = require("../controllers/lacp441s.controller.js");
    const pofromvendor = require("../controllers/pofromvendor.controller.js");

    // ✅ Import User Management Controller
    const users = require("../controllers/users.controller.js");

    var router = require("express").Router();

    // ✅ Existing Employee Routes (Base Path: /api/employees)
    router.get("/", employees.findAll);
    router.get("/attendance/:id", ppay802s.findAll);
    router.get("/ppay121s", ppay121s.findAll);
    router.get("/ppay122s", ppay122s.findAll);
    router.get("/ppay125s", ppay125s.findAll);
    router.get("/ppay124s", ppay124s.findAll);
    router.get("/ppay127s", ppay127s.findAll);
    router.get("/attendancedetail/:id", ppai719as.findAll);
    router.get("/pfrs860s/:id", pfrs860s.findAll);
    router.get("/pfrs860sdetails/data", pfrs860sdetails.findAll);
    router.get("/miscdata/:id", peis480ds.findAll);
    router.get("/certificates/:id", certificates.findAll);
    router.get("/salaries/:id", salaries.findAll);
    router.get("/voldeductions/:id", ppay3403s.findAll);
    router.get("/tags/:id", peis480hs.findAll);
    router.get("/payroll/:id", ppai712s.findAll);
    router.get("/payrollCheck/", ppai713s.findAll);
    router.get("/payrollCheckDeductions/", ppai715s.findAll);
    router.get("/purchaseOrders/", purchaseOrders.findAll);
    router.get("/pofromvendor/", pofromvendor.findAll);
    router.get("/lacp441s/", lacp441s.findAll);
    router.get("/ppur301s/", ppur301s.findAll);
    router.get("/ppur301s/:id", ppur301s.findOne);
    router.get("/:id", employees.findOne);

    app.use('/api/employees', router);

    // ✅ User Management Routes (Base Path: /api/users)
    var userRouter = require("express").Router();
    userRouter.get("/", users.findAll);          // Get all users
    userRouter.post("/", users.create);         // Add a new user
    userRouter.put("/:email", users.update);    // Update a user by email
    userRouter.delete("/:email", users.delete); // Delete a user by email

    app.use('/api/users', userRouter);
};
