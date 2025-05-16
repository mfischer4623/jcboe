const express = require("express");
const router = express.Router();

const controllers = {
  x: require("../controllers/x.controller.js"),
};

// 🚀 Log missing controllers for debugging
Object.entries(controllers).forEach(([name, controller]) => {
  if (!controller || Object.keys(controller).length === 0) {
    console.warn(`⚠️ Controller "${name}" is missing or empty.`);
  }
});

// ✅ Function to safely add routes only if controller functions exist
const safeRoute = (method, path, controllerFunction, routeName) => {
  if (controllerFunction) {
    router[method](path, controllerFunction);
    console.log(`✅ Route registered: ${method.toUpperCase()} ${path} -> ${routeName}`);
  } else {
    console.warn(`⚠️ Skipping route ${method.toUpperCase()} ${path} - Controller function is missing`);
  }
};

// ✅ User Authentication Routes
safeRoute("get", "/auth", controllers.users.authenticate, "users.authenticate");


// ✅ Attach router to the app
module.exports = (app) => {
  app.use("/api/employees", router);
  console.log("✅ API Routes initialized at: /api/employees");
};
