const express = require("express");
const router = express.Router();
const {
  queryAllUsers,
  querySingleUser,
  createNewUser,
  delUser,
  modifyUser,
} = require("../controllers/usersControlers");
router.route("/api/users").get(queryAllUsers).post(createNewUser);
router
  .route("/api/users/:id")
  .get(querySingleUser)
  .delete(delUser)
  .put(modifyUser);

module.exports = { router };
