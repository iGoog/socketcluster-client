import AGClientSocket from './clientsocket';
import uuid from 'uuid';
import scErrors from 'sc-errors';
const InvalidArgumentsError = scErrors.InvalidArgumentsError;

function isUrlSecure() {
  return window.location && location.protocol === 'https:';
}

function getPort(options, isSecureDefault) {
  let isSecure = options.secure == null ? isSecureDefault : options.secure;
  return options.port || (window.location && location.port ? location.port : isSecure ? 443 : 80);
}

function create(options) {
  options = options || {};

  if (options.host && !options.host.match(/[^:]+:\d{2,5}/)) {
    throw new InvalidArgumentsError(
      'The host option should include both' +
      ' the hostname and the port number in the format "hostname:port"'
    );
  }

  if (options.host && options.hostname) {
    throw new InvalidArgumentsError(
      'The host option should already include' +
      ' the hostname and the port number in the format "hostname:port"' +
      ' - Because of this, you should never use host and hostname options together'
    );
  }

  if (options.host && options.port) {
    throw new InvalidArgumentsError(
      'The host option should already include' +
      ' the hostname and the port number in the format "hostname:port"' +
      ' - Because of this, you should never use host and port options together'
    );
  }

  let isSecureDefault = isUrlSecure();

  let opts = {
    clientId: uuid.v4(),
    port: getPort(options, isSecureDefault),
    hostname: window.location && location.hostname || 'localhost',
    secure: isSecureDefault
  };

  Object.assign(opts, options);

  return new AGClientSocket(opts);
}

export default {
  create
};
