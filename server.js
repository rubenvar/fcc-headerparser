// init project
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "views")));

app.get('/api/whoami', (req, res) => {
  const { headers } = req;
  const [ipaddress] = headers['x-forwarded-for'].split(',');
  const [language] = headers['accept-language'].split(',');
  const [software] = headers['user-agent'].split('(')[1].split(')');
  return res.json({ ipaddress, language, software });
});

// listen for requests
const listener = app.listen(process.env.PORT || 7767, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
