const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

const getUsers = async () => {
  const [result] = await pool.query(`select * from users`);
  if (!result[0]) return "No users in the database";
  else return result;
};

const getUser = async (id) => {
  const [[result]] = await pool.query(
    `
    select * 
    from users
    where id = ?`,
    [id]
  );
  if (!result) return "No user with this id";
  else return result;
};

const newUser = async (name, email) => {
  const [result] = await pool.query(
    `
        insert into users (name, email)
        values (?,?)
    `,
    [name, email]
  );
  return await getUser(result.insertId);
};

const deleteUser = async (id) => {
  await pool.query(
    `
    delete from
    users
    where id = ?
    `,
    [id]
  );
  return await getUsers();
};

const updateUser = async (id, name, email) => {
  const [result] = await pool.query(
    `
    update users
    set name = ?, email = ?
    where id = ?
    `,
    [name, email, id]
  );
  return result;
};

module.exports = { getUsers, getUser, newUser, deleteUser, updateUser };
