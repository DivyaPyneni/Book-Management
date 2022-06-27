const express = require("express");

const usersController  = require("../controllers/user.controller");
const router = express.Router();

router.post("/", usersController.createUser);
router.post("/users", usersController.login);


module.exports = router;