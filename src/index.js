// require('source-map-support').install();

// const Authentication = require('./auth').default;
// const headers = require('./headers').default;
// const Accounts = require('./accounts').default;
// const Orders = require('./orders').default;
// const Data = require('./data').default;
// const Quotes = require('./quotes').default;
// const config = require('./config').default;
// const HttpsWorker = require('./network/https').default;

import Authentication from './auth.js';
import headers from './headers.js';
import Accounts from './accounts.js';
import Orders from './orders.js';
import Data from './data.js';
import Quotes from './quotes/index.js';
import config from './config.js';
import HttpsWorker from './network/https.js';

/**
 * Builds a new Trade session with an independent authentication
 * state, facilitating concurrent usage of the Trade APIs.
 *
 * The headers and config module, however, is mutually shared between
 * all sessions.
 */
function Session() {
  const worker = new HttpsWorker();
  const data = new Data(worker);

  return {
    auth: new Authentication(worker),
    headers,
    accounts: new Accounts(worker),
    orders: new Orders(worker, data),
    quotes: new Quotes(worker, data),
    data,
    config,
  };
};

// We need a default session exported for backwards compatibility reasons,
// but also because not everyone cares about concurrent usages.
const defaultSession = new Session();
// Allow the creation of multiple sessions through a Session() constructor
defaultSession.Session = () => new Session();

// module.exports = defaultSession;
export default Session;
