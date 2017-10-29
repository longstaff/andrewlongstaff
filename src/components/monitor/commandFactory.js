import {
  callResponse,
  clearHistory,
} from './MonitorActions';

function getNotFound(call) {
  return callResponse.bind(this, call, `${call}: command not found, please type 'help' for command list`);
}
const commandMap = {
  notFound: getNotFound
};

/* *********************************************************************** */
/* *********************** Gallery interactions ************************** */
/* *********************************************************************** */

/* *********************** Photography ************************** */

export const COMMAND_PHOTOGRAPHS = 'photographs';
export const COMMAND_PHOTOGRAPHS_ALT1 = 'photograph';
export const COMMAND_PHOTOGRAPHS_ALT2 = 'photography';
export const COMMAND_PHOTOGRAPHS_ALT3 = 'photos';

function getPhotographs(call) {
  return callResponse.bind(this, call, 'Photographs go in here!');
}

commandMap[COMMAND_PHOTOGRAPHS] = getPhotographs;
commandMap[COMMAND_PHOTOGRAPHS_ALT1] = getPhotographs;
commandMap[COMMAND_PHOTOGRAPHS_ALT2] = getPhotographs;
commandMap[COMMAND_PHOTOGRAPHS_ALT3] = getPhotographs;

/* *********************************************************************** */
/* *********************** Special interactions ************************** */
/* *********************************************************************** */

/* *********************** Colours ************************** */

export const COMMAND_COLOURS = 'colours';
export const COMMAND_COLOURS_ALT1 = 'colors';
export const COMMAND_COLOURS_ALT2 = 'colour';
export const COMMAND_COLOURS_ALT3 = 'color';

function getColours(call, args) {
  const colourArray = [
    { value: 'white', colour: 'white' },
    { value: 'grey', colour: 'grey' },
    { value: 'red', colour: 'red' },
    { value: 'purple', colour: 'purple' },
    { value: 'blue', colour: 'blue' },
    { value: 'green', colour: 'green' },
    { value: 'yellow', colour: 'yellow' },
  ];
  let useArray = colourArray;
  if (args.length) {
    useArray = colourArray.filter(colour => args.indexOf(colour.value) > -1);
    if (useArray.length === 0) {
      useArray = `No matching colours: ${args.join()}`;
    }
  }
  return callResponse.bind(this, call, useArray);
}

commandMap[COMMAND_COLOURS] = getColours;
commandMap[COMMAND_COLOURS_ALT1] = getColours;
commandMap[COMMAND_COLOURS_ALT2] = getColours;
commandMap[COMMAND_COLOURS_ALT3] = getColours;

/* *********************************************************************** */
/* ************************ Basic interactions *************************** */
/* *********************************************************************** */

/* *********************** About ************************** */

export const COMMAND_ABOUT = 'about';

function getAbout(call) {
  return callResponse.bind(this, call, [
    'I was born and raised in a small village outside of Oxford, England. There I learnt the values of craftsmanship, dedication to learning new things, and what you can accomplish when you live miles from anything interesting going on.',
    'I had a passion for the creative, and loved art, science, math and design. My father is a carpenter by trade but was at the forefront of the CAD system development, so the first program that I wrote was to control a Laser cutter. Since then I have had a great passion to try and find things to take apart, tinker with and perfect.',
    'I went to university to study Photography, the ultimate blend of science, art and technology, and got hooked on creating my own cameras, culminating in my final year project of deconstructed images.',
    'As part of this course I started dipping into web technologies as a hobby, making self promotional materials and adverts for shows that we were putting on at the time.',
    'I met my wife when studying, and moved to Finland after we graduated.',
    'While in Finland I self taught myself Java, and from there Flash Actionscript. With the breaking of HTML5 I learned javascript and PHP, css and HTML (correctly this time) as well as various database languages as needed. A few years later and I am now happily leading a team of developers, running modern web tech like react and redux as well as learning IOS and Android developement as well as C for hardware applications and Finnish. Guess which is the hardest...',
    'We moved back to England in 2017 and are looking forward to new things and new people!'
  ]);
}

commandMap[COMMAND_ABOUT] = getAbout;

/* *********************** Clear ************************** */
export const COMMAND_CLEAR = 'clear';

function clearInput() {
  return clearHistory;
}

commandMap[COMMAND_CLEAR] = clearInput;

/* *********************** Help ************************** */

export const COMMAND_HELP = 'help';

const helpList = [
  { command: COMMAND_HELP, man: 'Warning: Cyclical reference detected' },
  { command: COMMAND_COLOURS, man: 'List all the pretty colours of the command output' },
  { command: COMMAND_CLEAR, man: 'Clear the console' },
  { command: COMMAND_ABOUT, man: 'About Andrew Longstaff' },
  { command: COMMAND_PHOTOGRAPHS, man: 'Photography projects of Andrew Longstaff' },
];

function getHelp(call) {
  const maxLength = helpList.reduce((prev, next) => {
    const nextLength = next.command.length > prev ? next.command.length : prev;
    return nextLength;
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

commandMap[COMMAND_HELP] = getHelp;

/* *********************************************************************** */
/* **************************** Run Mapper ******************************* */
/* *********************************************************************** */

const splitArguments = (input) => {
  const split = input.split(/\s/);
  return {
    command: split[0],
    arguments: split.slice(1),
  };
};

/* *********************** Default export ************************** */

export default (call) => {
  const input = splitArguments(call);
  return (commandMap[input.command] || commandMap.notFound)(call, input.arguments);
};
