const { HOST, PASSWORD, DB, USER, PORT } = require('./constants');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DB,
  port: PORT,
});

connection.connect((error) => {
  if (error) {
    console.log(PORT, HOST, USER, PASSWORD, DB);
    console.error('Error connecting to database123:', error);
  } else {
    console.log('Database connection established successfully');
  }
});
async function register(data) {
  const { firstName, lastName, email, code, mobileNumber, password } = {
    ...data,
  };
  const check_user = `SELECT COUNT(*) AS COUNT from user WHERE email=? OR mobilenumber=?`;
  var checkUserResult = 0;
  connection.query(
    check_user,
    [email, mobileNumber],
    (err, results, fields) => {
      if (err) {
        console.log('ERRRRR>>>>>>>', err.message);
        throw err;
      }
      checkUserResult = results[0].COUNT;

      if (checkUserResult === 0) {
        console.log('nnnnnnn', checkUserResult, checkUserResult === 0, 1 === 0);
        const insert_data = `INSERT INTO user (firstName, lastName, email, code, mobileNumber, password)
      VALUES (?,?,?,?,?,?)`;
        connection.query(
          insert_data,
          [firstName, lastName, email, code, mobileNumber, password],
          (err, results, fields) => {
            if (err) {
              console.log('ERRRRR>>>>>>>', err.message);
              throw err;
            }
            console.log(results);
            return { message: 'user registerd succesfully', done: true };
          }
        );
      } else {
        console.log('ENTERIGN NOW');

        return { message: 'user already exists', done: false };
      }
    }
  );
}

module.exports = {
  register,
};
