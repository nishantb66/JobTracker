const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/login", adminController.adminLogin);
router.get("/users", adminController.getAllUsers);
router.delete("/users/:id", adminController.deleteUser);

module.exports = router;
