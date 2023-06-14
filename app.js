'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const {Datastore} = require('@google-cloud/datastore');
const sessionStorage = require('sessionstorage-for-nodejs');

const app = express();
app.enable('trust proxy');
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Database
const datastore = new Datastore({
  projectId: 'dactw-dpu-ichibantest-2023',
});

// Read index
app.get('/', (req, res) => {
  res
    .status(200)
    .sendFile(__dirname+'/index.html')
});

// Insert info
const insertInfo = info => {
  return datastore.save({
    key: datastore.key('info'),
    data: info,
  });
};

console.log("test");

// 接post過來的資料
app.post('/', function(req, res) {
  console.log("test");
  console.log(req.body.gender);
  res.send("Data received");
});


// Start the server
const PORT = process.env.PORT || 8080 ;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
});
