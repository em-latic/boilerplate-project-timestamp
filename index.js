// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// empty Date parameter
app.get("/api/", (req, res) => {
  //console.log('Empty date request - Responding with current datetime');
  const currentDate = new Date();
  const timeStamp = { "unix": Date.now(), "utc": currentDate.toUTCString() };
  //console.log(timeStamp);
  res.json(timeStamp);
});

// Date to parse:
app.get("/api/:date", (req, res) => {
  const inputDateTime = req.params.date;
  const unixT = Number(inputDateTime);
  
  let parsedDateTime;
  if(isNaN(unixT)){
    parsedDateTime = new Date(inputDateTime);
  }
  else {
    parsedDateTime = new Date(unixT);
  }
  //const parsedDateTime = new Date(inputDateTime);
  console.log('parsedDateTime', parsedDateTime);

  // Respond with Error Object if not a valid date:
  if( isNaN(parsedDateTime) ){ //.getTime()
    console.error('Input DateTime is invalid');
    res.json({ error : "Invalid Date" });
  }
  else {
    const timeStamp = { "unix": parsedDateTime.getTime(), "utc": parsedDateTime.toUTCString() };
    res.json(timeStamp);
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

/*
const myDateTime = new Date(); // standard JS Datetime object
const unixT1 = Date.now(); // current timestamp in unix format

  const unixT2 = myDateTime.getTime(); //turning UTC datetime to unix
const utcTime = myDateTime.toUTCString(); // to UTC time RFC 1123 format

const utcConvertT = new Date(2738693114151).toUTCString(); // convert 'unix' datetime to UTC format

//
const isoDate = "2025-02-04T18:18:34.151Z";
const unixTimestampMs = new Date(isoDate).getTime(); // Milliseconds since epoch
const unixTimestampSeconds = Math.floor(new Date(isoDate).getTime() / 1000); // Seconds since epoch
 */
