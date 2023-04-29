const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(express.urlencoded());
app.use(cors());
const { HOST, PASSWORD, DB, USER, PORT } = require('./constants');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DB,
  port: PORT,
});

app.use(bodyParser.json());

app.post('/register', (req, res) => {
  const { firstName, lastName, email, code, mobileNumber, password } = req.body;
  const check_user = `SELECT COUNT(*) AS COUNT from user WHERE email=? OR mobilenumber=?`;

  var checkUserResult = 0;
  connection.query(
    check_user,
    [email, mobileNumber],
    (err, results, fields) => {
      if (err) {
       
        throw err;
      }
      checkUserResult = results[0].COUNT;

      if (checkUserResult === 0) {
       
        const insert_data = `INSERT INTO user (firstName, lastName, email, code, mobileNumber, password)
      VALUES (?,?,?,?,?,?)`;
        connection.query(
          insert_data,
          [firstName, lastName, email, code, mobileNumber, password],
          (err, results, fields) => {
            if (err) {
              
              throw err;
            }
           
            res.send({ message: 'user registerd succesfully', done: true });
          }
        );
      } else {
      

        res.send({ message: 'user already exists', done: false });
      }
    }
  );
});

app.post('/signin', (req, res) => {
  const { userId, password } = req.body;

  connection.query(
    'SELECT isVerified,email FROM user WHERE (email = ? OR mobilenumber=?) AND password = ?',
    [userId, userId, password],
    (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while signing in.' });
      } else if (results.length === 0) {
        connection.query(
          'SELECT email FROM user WHERE email = ? OR mobilenumber=?',
          [userId, userId],
          (error, results1, fields) => {
            if (results1.length === 0) {
              res.send({
                message: 'User is not registered',
                done: false,
                isUser: true,
                isPassword: false,
              });
            } else {
              res.send({
                message: 'password is incorrect',
                done: false,
                isUser: false,
                isPassword: true,
              });
            }
          }
        );
      } else {
        res.json({
          message: 'User signed in successfully',
          done: true,
          isVerified: results[0].isVerified,
          email: results[0].email,
        });
      }
    }
  );
});
app.post('/sendcode', (req, res) => {
  const { email } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'saivarshatedla@gmail.com',
      pass: 'ylxppcuptmtuebkq',
      secure: true,
    },
  });
  const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);

  
  let mailOptions = {
    from: 'saivarshatedla@gmail.com',
    to: email,
    subject: 'Verify Your Account',
    text: `Your verification code for WisdomCircle is ${randomSixDigitNumber}`,
    html: `<b>Your verification code for WisdomCircle is ${randomSixDigitNumber}</b>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response, info);
    }
  });
  const update_query =
    'UPDATE user SET verificationcode = ?, verificationdate = NOW() WHERE email=?';
  connection.query(
    update_query,
    [randomSixDigitNumber, email],
    (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while submitting.' });
      } else {
        console.log('UPDATED');
      }
    }
  );
  res.send({
    message: 'verification code sent to the email',
    done: true,
    verificationcode: randomSixDigitNumber,
  });
});
app.post('/verify', (req, res) => {
  const { code, email } = req.body;
  const check_code_validation =
    'SELECT  CONVERT_TZ(verificationdate, "+00:00", "+00:00") AS verificationdate from user WHERE verificationcode=? AND email=?';
  connection.query(
    check_code_validation,
    [code, email],
    (error, results, fields) => {
    
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while verifying.' });
      } else if (results.length === 0) {
        res.send({ message: 'Code Expires', done: false });
      } else {
        const today_date = new Date();
        const date2 = new Date(results[0].verificationdate);

        const diffInMs = today_date - date2;

        const diffInMin = Math.abs(diffInMs / (1000 * 60));
        

        if (diffInMin > 5) {
          res.send({ message: 'Code Expires', done: false });
        } else {
          const update_query =
            'UPDATE user SET isVerified = true WHERE email=?';
          connection.query(update_query, [email]);

          res.send({ message: 'Successfully verified', done: true });
        }
      }
    }
  );
});

app.listen(4001, () => {
  console.log('Server started on port 4001.');
});
