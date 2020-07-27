const express = require('express');
const cors = require('cors');

const app = express();7

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Bring the routes
app.use("/user", require("./routes/user"));
app.use("/chatroom", require("./routes/chatroom"));

//Error handlers
const errorHandlers = require('./handlers/errorHandler');
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
if(process.env.ENV === "DEVELOPMENT"){
  app.use(errorHandlers.developmentErrors);
} else{
  app.use(errorHandlers.productionErrors);
}

module.exports = app;
