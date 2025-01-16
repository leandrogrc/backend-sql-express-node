const {
  getUsers,
  getUser,
  newUser,
  deleteUser,
  updateUser,
} = require("../database/database");

async function queryAllUsers(req, res) {
  try {
    const result = await getUsers();
    res.json({ message: "All users fetched!", response: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users!" });
  }
}

async function querySingleUser(req, res) {
  const { id } = req.params;

  try {
    const result = await getUser(id);
    res.json({ message: "User fetched", response: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user!" });
  }
}

async function createNewUser(req, res) {
  const { name, email } = req.body;

  try {
    const result = await newUser(name, email);
    res.json({ message: "User created!", response: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user!" });
  }
}

async function delUser(req, res) {
  const { id } = req.params;
  try {
    const result = await deleteUser(id);
    res.json({ message: "User deleted!", response: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user!" });
  }
}

async function modifyUser(req, res) {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const result = await updateUser(id, name, email);
    res.json({ message: "User updated!", response: result });
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
