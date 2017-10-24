import {
  callResponse,
  clearHistory,
} from './MonitorActions';

// Basic interactions
export const COMMAND_HELP = 'help';
export const COMMAND_CLEAR = 'clear';

// Special
export const COMMAND_COLOURS = 'colours';

const helpList = [
  { command: COMMAND_COLOURS, man: 'List all the pretty colours of the command output' },
  { command: COMMAND_CLEAR, man: 'Clear the console' },
];

export default (call) => {
  let response;

  switch (call) {
    case COMMAND_HELP:
      response = getHelp(call);
      break;
    default:
      response = callResponse.bind(this, call, `${call}: command not found, please type 'help' for command list`);
  }

  if (call === 'clear') {
    response = clearHistory;
  } else if (call === 'colours') {
    response = callResponse.bind(this, call, [
      { value: 'white', colour: 'white' },
      { value: 'grey', colour: 'grey' },
      { value: 'red', colour: 'red' },
      { value: 'purple', colour: 'purple' },
      { value: 'blue', colour: 'blue' },
      { value: 'green', colour: 'green' },
      { value: 'yellow', colour: 'yellow' },
    ]);
  }

  return response;
};

function getHelp(call) {
  const maxLength = helpList.reduce((prev, next) => {
    return next.command.length > prev ? next.command.length : prev;
  }, 0);
  const padding = new Array(maxLength + 1).join(' ');
  const commands = ['Available commands:'].concat(helpList.sort((a, b) => {
    if (a.command < b.command) return -1;
    if (a.command > b.command) return 1;
    return 0;
  }).map((val) => {
    const padCommand = `${val.command}${padding}`.slice(0, maxLength + 1);
    return `${padCommand} - ${val.man}`;
  }));

  return callResponse.bind(this, call, commands);
}
