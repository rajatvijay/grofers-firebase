const store = {};
const subscriptions = [];

module.exports.get = key => {
  return store[key];
};

module.exports.set = (key, value) => {
  store[key] = value;
  return true;
};
