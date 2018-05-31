const store = {};
const subscriptions = {};

const publish = (event, updatedData) => {
  if (!subscriptions[event]) {
    return false;
  }

  subscriptions[event].forEach (subs => subs (updatedData));
  return true;
};
module.exports.publish = publish;

module.exports.get = key => {
  return store[key];
};

module.exports.set = (key, value) => {
  store[key] = value;
  publish ('store-updated', {key, value});
  return true;
};

module.exports.subscribe = (event, callback) => {
  if (subscriptions[event]) {
    subscriptions[event].push (callback);
  } else {
    subscriptions[event] = [callback];
  }
  return true;
};
