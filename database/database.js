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
  else
    return {
      message: "All users fetched!",
      result,
    };
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
  else
    return {
      message: "User fetched",
      result,
    };
};

const newUser = async (username, email, password) => {
  const [[checkUsername]] = await pool.query(
    `
    select *
    from users
    where username = ?
    `,
    [username]
  );

  if (checkUsername)
    return {
      message: "Username not available! Choose another one please.",
    };

  const [result] = await pool.query(
    `
        insert into users (username, email, password)
        values (?,?,?)
    `,
    [username, email, password]
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
  return {
    message: "User deleted",
    users_on_database: await getUsers(),
  };
};

const updateUser = async (id, username, email, password) => {
  await pool.query(
    `
    update users
    set username = ?, email = ?, password = ?
    where id = ?
    `,
    [username, email, password, id]
  );
  return { message: "User updated!" };
};

module.exports = { getUsers, getUser, newUser, deleteUser, updateUser };
