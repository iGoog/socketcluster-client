import AGClientSocket from './lib/clientsocket';
import factory from './lib/factory';
const version = '16.0.1';

const create = function (options) {
  return factory.create({...options, version});
};

export default { create, factory, AGClientSocket, version };
