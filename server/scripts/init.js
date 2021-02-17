const Store = require('../store/store');
const Data = require('../data/data');

async function initializeDB() {
  try {
    const client = await Store.createDB();
    const tablesAreCreated = await createTables(client);
    tablesAreCreated && addUsers(Data.users, client);
    tablesAreCreated && addUsersWeights(client);
    tablesAreCreated && addUsersTension(client);
    tablesAreCreated && addUsersWaterConsumption(client);
    tablesAreCreated && addUsersExercices(client);
  } catch (e) {
    console.log(e);
  }
}

async function createTables(client) {
  try {
    await client.query(
      `CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT, age INT)`
    );
    await client.query(
      `CREATE TABLE usersweight (id SERIAL, user_id INT PRIMARY KEY, weight INT, date TEXT)`
    );
    await client.query(
      `CREATE TABLE userstension (id SERIAL, user_id INT PRIMARY KEY, tension INT, date TEXT)`
    );
    await client.query(
      `CREATE TABLE userswaterconsumption (id SERIAL, user_id INT PRIMARY KEY, glassofwaterdrunk INT, date TEXT)`
    );
    await client.query(
      `CREATE TABLE usersecercices (id SERIAL, user_id INT PRIMARY KEY, exerciceduration INT, exercicetype TEXT, date TEXT)`
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
        `INSERT INTO usersweight (user_id, weight, date) VALUES(${userID}, ${weight},'${date}') RETURNING *`
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
      console.log('userID', userID, typeof userID);
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
      const glassOfWaterDrunk = Math.floor(Math.random() * 10);
      const date = '02/02/2020 13:15';
      await client.query(
        `INSERT INTO userswaterconsumption (user_id,glassofwaterdrunk,date) VALUES(${userID},${glassOfWaterDrunk},'${date}') RETURNING *`
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
