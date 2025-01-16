const {
  getUsers,
  getUser,
  newUser,
  deleteUser,
  updateUser,
} = require("../database/database");

const bcrypt = require("bcryptjs");

async function queryAllUsers(req, res) {
  try {
    const result = await getUsers();
    res.json({ response: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users!" });
  }
}

async function querySingleUser(req, res) {
  const { id } = req.params;

  try {
    const result = await getUser(id);
    res.json({ response: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user!" });
  }
}

async function createNewUser(req, res) {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await newUser(username, email, hashedPassword);
    res.json({ response: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user!" });
  }
}

async function delUser(req, res) {
  const { id } = req.params;
  try {
    const result = await deleteUser(id);
    res.json({ response: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user!" });
  }
}

async function modifyUser(req, res) {
  const { id } = req.params;
  const { username, email, password } = req.body;
  try {
    const result = await updateUser(id, username, email, password);
    res.json({ response: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user!" });
  }
}

module.exports = {
  queryAllUsers,
  querySingleUser,
  createNewUser,
  delUser,
  modifyUser,
};
