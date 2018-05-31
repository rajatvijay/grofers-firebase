const express = require ('express');
const app = express ();
const server = require ('http').Server (app);
const bodyParser = require ('body-parser');
const {
  get: getFromStore,
  set: setInStore,
  subscribe: subscribeStoreEvent,
} = require ('./store');

// Sockets
var io = require ('socket.io') (server);
io.on ('connection', function (socket) {
  subscribeStoreEvent ('store-updated', updatedData => {
    socket.emit ('store-updated', {updatedData});
  });
});

// For parsing JSON
app.use (bodyParser.json ());

// Send the file with socket config
app.get ('/', (req, res) => {
  res.set ('Access-Control-Allow-Origin', '*');
  res.sendFile (__dirname + '/index.html');
});

// Get from the store
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

// Start the server
server.listen (3000, () => console.log ('Server is running!'));
