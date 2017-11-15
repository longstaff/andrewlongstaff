export const OK = 0;
export const WARN = 1;
export const ERROR = 2;

function logToConsole(message) {
  console.log(message);
}
function warnToConsole(message) {
  console.warn(message);
}
function errorToConsole(message) {
  console.error(message);
}

const responseMap = {
  [OK]: 'Command completed',
  [WARN]: 'Command completed with irregularities',
  [ERROR]: 'Command could not complete',
  default: 'ERROR: STATE NOT FOUND',
};
const loggerMap = {
  [OK]: logToConsole,
  [WARN]: warnToConsole,
  [ERROR]: errorToConsole,
  default: errorToConsole,
};

function logGroup(message = [], logger) {
  console.group();
  message.map(logger);
  console.groupEnd();
}

export default function writeToConsole(message = '', error = 0) {
  const logger = loggerMap[error] ? loggerMap[error] : loggerMap.default;
  let logMessage = message;
  if (!logMessage) logMessage = responseMap[error] ? responseMap[error] : responseMap.default;

  if (Array.isArray(logMessage)) {
    logGroup(logMessage, logger);
  } else {
    logger(logMessage);
  }
}
