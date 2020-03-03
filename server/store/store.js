const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '192.168.99.100',
  database: 'healthapp',
  password: '',
  port: 5002,
});

let client = null;

async function createDB() {
  client = await pool.connect();
  const res = await client.query('SELECT NOW()');
  console.log(res.rows[0]);
  return client;
}

async function getUsers() {
  try {
    const { rows } = await client.query('SELECT * FROM users');
    return rows;
  } catch (e) {
    console.log(e);
  }
}

async function getUserByID(userID) {
  try {
    const { rows } = await client.query(
      `SELECT * FROM users WHERE id=${userID}`
    );
    return rows[0];
  } catch (e) {
    console.log(e);
  }
}

async function getUserWeightByID(userID) {
  try {
    const { rows } = await client.query(
      `SELECT weight, date FROM usersweight WHERE user_id=${userID}`
    );
    return rows[0];
  } catch (e) {
    console.log(e);
  }
}

async function getUserWaterConsumptionByID(userID) {
  try {
    const { rows } = await client.query(
      `SELECT glassofwaterdrunk,date FROM userswaterconsumption WHERE user_id=${userID} `
    );
    return rows[0];
  } catch (e) {
    console.log(e);
  }
}

async function getUserTensionByID(userID) {
  try {
    const { rows } = await client.query(
      `SELECT * FROM userstension WHERE user_id=${userID}`
    );
    return rows[0];
  } catch (e) {
    console.log(e);
  }
}

async function getUserExercicesByID(userID) {
  try {
    const { rows } = await client.query(
      `SELECT exerciceduration,exercicetype,date FROM usersecercices WHERE user_id=${userID} `
    );
    return rows[0];
  } catch (e) {
    console.log(e);
  }
}

async function updateUserWeight(userID, weight, date) {
  try {
    console.log(
      `INSERT INTO usersweight (user_id,weight,date) VALUES(${userID},${weight},'${date}') RETURNING *`
    );
    const { rows } =
      weight !== 0
        ? await client.query(
            `INSERT INTO usersweight (user_id,weight,date) VALUES(${userID},${weight},'${date}') RETURNING *`
          )
        : {};
    return rows[0];
  } catch (e) {
    console.log(e);
  }
}

async function updateUserTension(userID, tension, date) {
  try {
    const { rows } =
      tension !== 0
        ? await client.query(
            `INSERT INTO userstension(user_id,tension,date) VALUES(${userID},${tension},'${date}')`
          )
        : {};
    return rows[0];
  } catch (e) {
    console.log(e);
  }
}

async function updateUserDrinkConsumption(userID, waterDrunk, date) {
  try {
    const { rows } =
      waterDrunk !== 0
        ? await client.query(
            `INSERT INTO userswaterconsumption (user_id,glassofwaterdrunk,date) VALUES(${userID},${waterDrunk},'${date}') `
          )
        : {};
    return rows[0];
  } catch (e) {
    console.log(e);
  }
}

async function updateUserExercices(
  userID,
  exerciceType,
  exerciceDuration,
  date
) {
  try {
    const { rows } =
      exerciceDuration !== 0 && exerciceType !== ''
        ? client.query(
            `INSERT INTO usersecercices (user_id,exerciceduration,exercicetype,date) VALUES(${userID},${exerciceDuration},'${exerciceType}','${date}')`
          )
        : {};
    return rows[0];
  } catch (e) {
    console.log(e);
  }
}

createDB();
module.exports = {
  createDB,
  getUsers,
  getUserByID,
  getUserWeightByID,
  getUserWaterConsumptionByID,
  getUserTensionByID,
  getUserExercicesByID,
  updateUserWeight,
  updateUserTension,
  updateUserDrinkConsumption,
  updateUserExercices,
};
