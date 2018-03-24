// init project
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, "views")));

app.get('/api/whoami', (req, res) => {
  let headers = req.headers;
  let ipaddress = headers['x-forwarded-for'].split(',')[0];
  let language = headers['accept-language'].split(',')[0];
  let software = headers['user-agent'].split('(')[1].split(')')[0];
  let obj = {ipaddress: ipaddress, language: language, software: software}
  res.json(obj);
});

// listen for requests
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
