const Store = require('../store/store');
const Data = require('../data/data');

async function initializeDB() {
  const client = await Store.createDB();
  //addUsers(Data.users, client);
  //addUsersWeights(client);
  addUsersTension(client);
  addUsersWaterConsumption(client);
  addUsersExercices(client);
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

//initializeDB();
