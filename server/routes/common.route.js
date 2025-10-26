const express = require("express");
const router = express.Router();

const { searchByIdentify } = require("../controllers/common.controller");

router.post("/search", searchByIdentify);

module.exports = router;