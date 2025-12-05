const express = require("express");

const membersController = require("../../controllers/membersController");

const router = express.Router();

router.get("/", membersController.getAllMembers);

router.get("/:memberId", membersController.getOneMember);

router.post("/", membersController.createNewMember);

router.delete("/:memberId", membersController.deleteOneMember);

module.exports = router;