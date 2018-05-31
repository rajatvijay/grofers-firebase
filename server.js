const express = require ('express');
const app = express ();
const server = require ('http').Server (app);
const bodyParser = require ('body-parser');

app.use (bodyParser.json ());

const {get: getFromStore, set: setInStore} = require ('./store');

// Set from the store
app.get ('/get', (req, res) => {
  const {key} = req.query;
  const data = getFromStore (key);
  res.send (JSON.stringify ({data}));
});

// Set in the store
app.post ('/set', (req, res) => {
  const {key, value} = req.body;
  const result = setInStore (key, value);
  res.send (JSON.stringify ({status: result}));
});

server.listen (3000, () => console.log ('Server is running!'));
