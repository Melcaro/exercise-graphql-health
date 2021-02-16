const Store = require('../store/store');
const Data = require('../data/data');

async function initializeDB() {
  try {
    const client = await Store.createDB();
    deleteTables(client);
    await createTables(client);
    addUsers(Data.users, client);
    addUsersWeights(client);
    addUsersTension(client);
    addUsersWaterConsumption(client);
    addUsersExercices(client);
  } catch (e) {
    console.log(e);
  }
}

async function createTables(client) {
  try {
    await client.query(
      `CREATE TABLE users  (id SERIAL PRIMARY KEY, name TEXT, age INT)`
    );
    await client.query(
      `CREATE TABLE usersweight (user_id INT PRIMARY KEY, weight INT, date DATE)`
    );
    await client.query(
      `CREATE TABLE userstension (user_id INT PRIMARY KEY, tension INT, date TEXT)`
    );
    await client.query(
      `CREATE TABLE userswaterconsumption (user_id INT PRIMARY KEY, glassofwaterdrunk INT, date TEXT)`
    );
    await client.query(
      `CREATE TABLE usersecercices (user_id INT PRIMARY KEY, exerciceduration INT, exercicetype TEXT, date TEXT)`
    );
    return true;
  } catch (e) {
    console.log(e);
  }
}

async function deleteTables(client) {
  try {
    return await client.query(`TRUNCATE TABLE users`);
  } catch (e) {
    console.log(e);
  }
}

function addUsers(usersList = [], client) {
  try {
    return usersList.forEach(async ({ name, age }) => {
      await client.query(
        `INSERT INTO users(name,age) VALUES('${name}',${age}) RETURNING *`
      );
    });
  } catch (e) {
    console.log(e);
  }
}

async function addUsersWeights(client) {
  try {
    const { rows: users } = await client.query('SELECT * FROM users');

    users.forEach(async ({ id: userID }) => {
      const weight = Math.floor(Math.random() * 100);
      const date = '02/02/2020 12:40';
      await client.query(
        `INSERT INTO usersweight (user_id, weight, date) VALUES(${userID}, ${weight},'${date}' ) RETURNING *`
      );
    });
  } catch (e) {
    console.log(e);
  }
}

async function addUsersTension(client) {
  try {
    const { rows: users } = await client.query('SELECT * FROM users');

    users.forEach(async ({ id: userID }) => {
      const tension = Math.floor(Math.random() * 100);
      const date = '02/02/2020 13:00';
      await client.query(
        `INSERT INTO userstension (user_id,tension,date) VALUES(${userID},${tension},'${date}') RETURNING *`
      );
    });
  } catch (e) {
    console.log(e);
  }
}

async function addUsersWaterConsumption(client) {
  try {
    const { rows: users } = await client.query('SELECT * FROM users');
    users.forEach(async ({ id: userID }) => {
      const date = '02/02/2020 13:15';
      await client.query(
        `INSERT INTO userswaterconsumption (user_id,glassofwaterdrunk,date) VALUES(${userID},0,'${date}') RETURNING *`
      );
    });
  } catch (e) {
    console.log(e);
  }
}

async function addUsersExercices(client) {
  try {
    const { rows: users } = await client.query('SELECT * FROM users');
    users.forEach(async ({ id: userID }) => {
      const exerciceTime = Math.floor(Math.random() * 100);
      const date = '02/02/2020 13:10';
      await client.query(
        `INSERT INTO usersecercices (user_id,exerciceduration,exercicetype,date) VALUES(${userID},${exerciceTime},'velo','${date}') RETURNING *`
      );
    });
  } catch (e) {
    console.log(e);
  }
}

try {
  initializeDB();
} catch (e) {
  console.log(e);
}
