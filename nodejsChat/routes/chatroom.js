const router =  require('express').Router();
const {catchErrors} = require("../handlers/errorHandler");
const chatroomController = require("../controllers/chatroomController");

const auth = require('../middlewares/auth');

router.get("/", auth, catchErrors(chatroomController.getAll));
router.post("/", auth, catchErrors(chatroomController.create));

module.exports = router;
