const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
//const logger= require('./middleware/logger');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

//Load env vars
dotenv.config({ path: './config/config.env' });

//connect to database
connectDB();

//Route files
const bootcamps = require('./routes/bootcamp');
const courses = require('./routes/course');
const users = require('./routes/user');
const TgCourses = require('./routes/TgCourses');
const Module = require('./routes/module');
const Activity = require('./routes/activity');
const Quiz = require('./routes/quiz');

const app = express();
//body parser

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//to use fileupload middleware for file uploading
app.use(fileupload());

//set static folder

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/users', users);
app.use('/api/v1/TgCourses', TgCourses);
app.use('/api/v1/modules', Module);
app.use('/api/v1/activity', Activity);
app.use('/api/v1/quiz', Quiz);


app.use(errorHandler);

const PORT = process.env.PORT || 5010;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on the port ${PORT}`.yellow
      .bold
  )
);
// handling unhandled errors
process.on(`Unhandled Rejections`, (err, promise) => {
  console.log(`Error :${err.message}`.red.bold);
  //close serve and send message

  server.close(() => process.exit(1));
});
