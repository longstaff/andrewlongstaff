import ReactGA from 'react-ga';
import {
  callResponse,
  clearHistory,
  setFlicker,
} from './MonitorActions';
import {
  OK,
  WARN,
  ERROR,
} from '../console/Console';
import photoA from '../../img/a.jpg';
import photoB from '../../img/b.jpg';
import photoC from '../../img/c.jpg';
import photoD from '../../img/d.jpg';

function getNotFound(call) {
  return callResponse.bind(this, call, `${call}: command not found, please type 'help' for command list`, WARN, 'Command not found');
}
function getArgumentNotFound(call, arg, command) {
  return `${command} does not support '${arg}' please check your input and try again`;
}
function getArgumentInvalid(call, number, command) {
  return `${command} only supports ${number} argument${number !== 1 ? 's' : ''}. please check your input and try again`;
}
function getCommandHint(command) {
  return `For more info on a highlighted topic type '${command} {subject}'`;
}
function getLinkHint() {
  return 'To follow a highlighted link type \'open {link}\'';
}
function getHintSpace() {
  return ' ';
}
const commandMap = {
  notFound: getNotFound
};

/* *********************************************************************** */
/* ******************************** Game ********************************* */
/* *********************************************************************** */

/* *********************** Login ************************** */
export const COMMAND_SUDO = 'sudo';
export const COMMAND_SU = 'su';
export const COMMAND_LOGIN = 'login';
function getLogin(call, args) {
  let arr = 'Incorrect login, please try again';
  let level = ERROR;
  let message = 'Incorrect credentials, please try again';

  if (!args || !args.length) {
    arr = 'Missing parameters: username, password';
  } else if (args.length !== 3 || args[1] !== '-p') {
    arr = 'Missing parameter: password';
  } else if (args.join('') === 'andrew-pkatri') {
    arr = 'Welcome back Andrew, the strongest Avenger';
    level = OK;
    message = 'Login complete, to access code environment type start';
  } else if (args.join('') === 'katri-pandrew') {
    arr = 'User temporarily disabled, please contact your administrator: andrew.';
    level = WARN;
    message = 'User disabled for weak password, please contact admin to reset to something stronger.';
  }
  return callResponse.bind(this, call, arr, level, message);
}
commandMap[COMMAND_SUDO] = getLogin;
commandMap[COMMAND_SU] = getLogin;
commandMap[COMMAND_LOGIN] = getLogin;

/* *********************************************************************** */
/* ******************************* Jokes ********************************* */
/* *********************************************************************** */

/* *********************** Jokes ************************** */

export const COMMAND_CD = 'cd';
function getCdJoke(call) {
  return callResponse.bind(this, call, 'No-one uses cd\'s any more.');
}
commandMap[COMMAND_CD] = getCdJoke;

export const COMMAND_WHOAMI = 'whoami';
function getWhoAmIJoke(call) {
  return callResponse.bind(this, call, 'now is not the time for an existencial crisis.');
}
commandMap[COMMAND_WHOAMI] = getWhoAmIJoke;

export const COMMAND_WHATIS = 'whatis';
function getWhatIsJoke(call, args) {
  let resp = 'whatever you want it to be';
  if (args[0] === 'love') resp = 'baby dont hurt me, dont hurt me, no more.';
  return callResponse.bind(this, call, resp);
}
commandMap[COMMAND_WHATIS] = getWhatIsJoke;

export const COMMAND_RM = 'rm';
export const COMMAND_RMDIR = 'rmdir';
function getRmJoke(call) {
  return callResponse.bind(this, call, 'Cant touch this');
}
commandMap[COMMAND_RM] = getRmJoke;
commandMap[COMMAND_RMDIR] = getRmJoke;

export const COMMAND_CAT = 'cat';
function getCatJoke(call) {
  return callResponse.bind(this, call, 'Meow?');
}
commandMap[COMMAND_CAT] = getCatJoke;

export const COMMAND_NETCAT = 'netcat';
function getNetCatJoke(call) {
  return callResponse.bind(this, call, '|\\/|30\\/\\/?');
}
commandMap[COMMAND_NETCAT] = getNetCatJoke;

export const COMMAND_PING = 'ping';
function getPingJoke(call) {
  return callResponse.bind(this, call, 'Pong!');
}
commandMap[COMMAND_PING] = getPingJoke;

export const COMMAND_TRACEROUTE = 'traceroute';
function getTraceRouteJoke(call) {
  return callResponse.bind(this, call, 'I cant find my pencil...');
}
commandMap[COMMAND_TRACEROUTE] = getTraceRouteJoke;

export const COMMAND_MV = 'mv';
function getMvJoke(call) {
  return callResponse.bind(this, call, 'I like to mv it mv it!');
}
commandMap[COMMAND_MV] = getMvJoke;

export const COMMAND_CP = 'cp';
function getCpJoke(call) {
  return callResponse.bind(this, call, 'Damnit Jim, I\'m a server not a photocopier!');
}
commandMap[COMMAND_CP] = getCpJoke;

export const COMMAND_KILL = 'kill';
function getKillJoke(call) {
  return callResponse.bind(this, call, 'Im a pacifist');
}
commandMap[COMMAND_KILL] = getKillJoke;

export const COMMAND_FIND = 'find';
function getFindJoke(call) {
  return callResponse.bind(this, call, 'Follow the sun for three days then follow the river upstream, you cant miss it');
}
commandMap[COMMAND_FIND] = getFindJoke;

export const COMMAND_NOHUP = 'nohup';
function getNoHupJoke(call) {
  return callResponse.bind(this, call, 'No, you hang up...');
}
commandMap[COMMAND_NOHUP] = getNoHupJoke;

export const COMMAND_MOUNT = 'mount';
function getMountJoke(call) {
  return callResponse.bind(this, call, 'Shouldn\'t you at least buy me dinner first?');
}
commandMap[COMMAND_MOUNT] = getMountJoke;

export const COMMAND_BASH = 'bash';
function getBashJoke(call) {
  return callResponse.bind(this, call, 'Ow, stop that!');
}
commandMap[COMMAND_BASH] = getBashJoke;

export const COMMAND_FSCK = 'fsck';
function getFsckJoke(call) {
  return callResponse.bind(this, call, 'Fsck you too!');
}
commandMap[COMMAND_FSCK] = getFsckJoke;

export const COMMAND_TEE = 'tee';
function getTeeJoke(call) {
  return callResponse.bind(this, call, 'Black, no sugar please');
}
commandMap[COMMAND_TEE] = getTeeJoke;

export const COMMAND_PWD = 'pwd';
export const COMMAND_PASSWD = 'passwd';
function getPwdJoke(call) {
  return callResponse.bind(this, call, 'Knock three times, wait a second then knock twice more');
}
commandMap[COMMAND_PWD] = getPwdJoke;
commandMap[COMMAND_PASSWD] = getPwdJoke;

export const COMMAND_TTY = 'tty';
function getTtyJoke(call) {
  return callResponse.bind(this, call, 'I love ttys too');
}
commandMap[COMMAND_TTY] = getTtyJoke;

export const COMMAND_INIT = 'init';
function getInitJoke(call) {
  return callResponse.bind(this, call, 'Bring me back');
}
commandMap[COMMAND_INIT] = getInitJoke;

export const COMMAND_ECHO = 'echo';
function getEchoJoke(call) {
  return callResponse.bind(this, call, 'ECHO, Echo, echo...');
}
commandMap[COMMAND_ECHO] = getEchoJoke;

export const COMMAND_TAIL = 'tail';
function getTailJoke(call) {
  return callResponse.bind(this, call, 'Follow that car!');
}
commandMap[COMMAND_TAIL] = getTailJoke;

export const COMMAND_ENV = 'env';
function getEnvJoke(call) {
  return callResponse.bind(this, call, 'Save the env, use the recycle bin!');
}
commandMap[COMMAND_ENV] = getEnvJoke;

export const COMMAND_GIT = 'git';
function getGitJoke(call) {
  return callResponse.bind(this, call, 'Who are you calling a git?');
}
commandMap[COMMAND_GIT] = getGitJoke;

export const COMMAND_MKDIR = 'mkdir';
export const COMMAND_VI = 'vi';
export const COMMAND_VIM = 'vim';
export const COMMAND_PICO = 'pico';
export const COMMAND_DD = 'dd';
export const COMMAND_DF = 'df';
export const COMMAND_CRON = 'cron';
export const COMMAND_NSLOOKUP = 'nslookup';
export const COMMAND_LS = 'ls';
export const COMMAND_CHMOD = 'chmod';
export const COMMAND_CHROOT = 'chroot';
export const COMMAND_GREP = 'grep';
export const COMMAND_GZIP = 'gzip';
export const COMMAND_WGET = 'wget';
export const COMMAND_NETSTAT = 'netstat';
export const COMMAND_CHOWN = 'chown';
export const COMMAND_IFCONFIG = 'ifconfig';
export const COMMAND_FDISK = 'fdisk';
function getJokeNo(call) {
  const options = [
    'No',
    'Negative',
    'Why would you want to do that?',
    'I dont think so',
    'Unsure, try again later',
    'I cant do it captain, I dont have the power!',
    'Who do you think you are?',
  ];
  return callResponse.bind(this, call, options[Math.floor(Math.random() * options.length)]);
}
commandMap[COMMAND_MKDIR] = getJokeNo;
commandMap[COMMAND_VI] = getJokeNo;
commandMap[COMMAND_VIM] = getJokeNo;
commandMap[COMMAND_PICO] = getJokeNo;
commandMap[COMMAND_DD] = getJokeNo;
commandMap[COMMAND_DF] = getJokeNo;
commandMap[COMMAND_CRON] = getJokeNo;
commandMap[COMMAND_NSLOOKUP] = getJokeNo;
commandMap[COMMAND_LS] = getJokeNo;
commandMap[COMMAND_CHMOD] = getJokeNo;
commandMap[COMMAND_CHROOT] = getJokeNo;
commandMap[COMMAND_GREP] = getJokeNo;
commandMap[COMMAND_GZIP] = getJokeNo;
commandMap[COMMAND_WGET] = getJokeNo;
commandMap[COMMAND_NETSTAT] = getJokeNo;
commandMap[COMMAND_CHOWN] = getJokeNo;
commandMap[COMMAND_IFCONFIG] = getJokeNo;
commandMap[COMMAND_FDISK] = getJokeNo;

/* *********************************************************************** */
/* *********************** Gallery interactions ************************** */
/* *********************************************************************** */

/* *********************** Photography ************************** */

export const COMMAND_PHOTOGRAPHS = 'photographs';
export const COMMAND_PHOTOGRAPHS_ALT1 = 'photograph';
export const COMMAND_PHOTOGRAPHS_ALT2 = 'photography';
export const COMMAND_PHOTOGRAPHS_ALT3 = 'photos';

const photosMap = {
  notFound: getArgumentNotFound
};
export const ARGUMENT_PHOTOGRAPHS_SCAPE = 'scape';
function getPhotosScape() {
  return [
    'Scape was a series of 12 images made with a custom made camera. Images were shot on a full roll of medium format film and then contact printed',
    'Final presentation size is approx. 1m x 60mm',
    getHintSpace(),
    'For more information ***email*** me',
  ];
}
photosMap[ARGUMENT_PHOTOGRAPHS_SCAPE] = getPhotosScape;

export const ARGUMENT_PHOTOGRAPHS_EXTERNAL = 'external';
function getPhotosExternal() {
  return [
    'Some of my pictures can be found on external sites, find things here:',
    '***500px***',
    '***instagram***',
    getHintSpace(),
    getLinkHint(),
  ];
}
photosMap[ARGUMENT_PHOTOGRAPHS_EXTERNAL] = getPhotosExternal;

function getPhotographsDefault(call, args, command) {
  return [
    '**Scape**:',
    ' ',
    '-- Scape 1 --',
    `[${photoA}]`,
    ' ',
    '-- Scape 2 --',
    `[${photoB}]`,
    ' ',
    '-- Scape 3 --',
    `[${photoC}]`,
    ' ',
    '-- Scape 4 --',
    `[${photoD}]`,
    ' ',
    '**External**',
    '***500px***',
    '***instagram***',
    getHintSpace(),
    getCommandHint(command),
    getLinkHint(),
  ];
}

function getPhotographs(call, args, command) {
  let arr = [];
  if (args.length > 1) {
    arr = getArgumentInvalid(command, 1);
  } else if (args.length === 1) {
    arr = (photosMap[args[0]] || photosMap.notFound)(call, args, command);
  } else {
    arr = getPhotographsDefault(call, args, command);
  }
  return callResponse.bind(this, call, arr);
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

const aboutMap = {
  notFound: getArgumentNotFound
};
export const ARGUMENT_ABOUT_PHOTOGRAPHS = 'photographs';
export const ARGUMENT_ABOUT_PHOTOGRAPHS_ALT1 = 'photograph';
export const ARGUMENT_ABOUT_PHOTOGRAPHS_ALT2 = 'photography';
export const ARGUMENT_ABOUT_PHOTOGRAPHS_ALT3 = 'photos';
function getAboutPhotos() {
  return [
    'My photography work is centered in two main branches, experimental and structural.',
    'After my work in uni I have a great interest in the mechanics of photography, making cameras and playing with the creation of images, more can be seen in the \'photography\' section.',
    'My general shooting is done on square formats, either in ***instagram*** or 6x6 medium format which can be seen in ***500px***. I shoot for details, textures, compositions and juxtapositions.',
    getHintSpace(),
    getLinkHint(),
  ];
}
aboutMap[ARGUMENT_ABOUT_PHOTOGRAPHS] = getAboutPhotos;
aboutMap[ARGUMENT_ABOUT_PHOTOGRAPHS_ALT1] = getAboutPhotos;
aboutMap[ARGUMENT_ABOUT_PHOTOGRAPHS_ALT2] = getAboutPhotos;
aboutMap[ARGUMENT_ABOUT_PHOTOGRAPHS_ALT3] = getAboutPhotos;

export const ARGUMENT_ABOUT_WORK = 'work';
export const ARGUMENT_ABOUT_WORK_ALT1 = 'working';
function getAboutWork() {
  return [
    'My work is generally under NDA, but that stuff that I can share is generally found in ***github***, including the ***source*** of this page',
    'My profile can be found on ***linkedin***',
    getHintSpace(),
    getLinkHint(),
  ];
}
aboutMap[ARGUMENT_ABOUT_WORK] = getAboutWork;
aboutMap[ARGUMENT_ABOUT_WORK_ALT1] = getAboutWork;

function getAboutDefault() {
  return [
    'Hi, I\'m --Andrew--,',
    'I was born and raised in a small village outside of Oxford, England. There I learnt the values of craftsmanship, dedication to learning new things, and what you can accomplish when you live miles from anything interesting going on.',
    'I had a passion for the creative, and loved art, science, math and design. My father is a carpenter by trade but was at the forefront of the CAD system development, so the first program that I wrote was to control a Laser cutter. Since then I have had a great passion to try and find things to take apart, tinker with and perfect.',
    'I went to university to study **Photography**, the ultimate blend of science, art and technology, and got hooked on creating my own cameras, culminating in my final year project of deconstructed images.',
    'As part of this course I started dipping into web technologies as a hobby, making self promotional materials and adverts for shows that we were putting on at the time.',
    'I met my wife --Katri-- when studying, and moved to Finland after we graduated.',
    'While in Finland I self taught myself Java, and from there Flash Actionscript. With the breaking of HTML5 I learned javascript and PHP, css and HTML (correctly this time) as well as various database languages as needed. A few years later and I am still **working** hands on, but now happily leading a team of developers, running modern web tech like react and redux as well as learning IOS and Android developement as well as C for hardware applications and Finnish. Guess which is the hardest...',
    'We moved back to England in 2017 and are looking forward to new things and new people!',
    getHintSpace(),
    getCommandHint(COMMAND_ABOUT)
  ];
}

function getAbout(call, args, command) {
  let arr = [];
  let level = OK;
  let message = '';
  if (args.length > 1) {
    arr = getArgumentInvalid(command, 1);
  } else if (args.length === 1) {
    arr = (aboutMap[args[0]] || aboutMap.notFound)(call, args, command);
  } else {
    arr = getAboutDefault();
    level = WARN;
    message = 'Warning, irregular data transmission, possible data leak detected. See log for details.';
  }
  return callResponse.bind(this, call, arr, level, message);
}

commandMap[COMMAND_ABOUT] = getAbout;

/* *********************** Contact ************************** */
export const COMMAND_CONTACT = 'contact';
export const COMMAND_CONTACT_ALT1 = 'email';

function getEmail(call, args, command) {
  let arr = [];
  if (args.length) {
    arr = getArgumentInvalid(command, 0);
  } else {
    arr = [
      'Drop me a line by ***email*** at',
      '***web@andrewlongstaff.com***',
      getHintSpace(),
      getLinkHint(),
    ];
  }
  return callResponse.bind(this, call, arr);
}

commandMap[COMMAND_CONTACT] = getEmail;
commandMap[COMMAND_CONTACT_ALT1] = getEmail;

/* *********************** Clear ************************** */
export const COMMAND_CLEAR = 'clear';

function clearInput() {
  return clearHistory;
}

commandMap[COMMAND_CLEAR] = clearInput;

/* *********************** Flicker ************************** */
export const COMMAND_FLICKER = 'flicker';
export const COMMAND_FLICKER_ALT1 = 'f';

function switchFlickerOn(call) {
  return setFlicker.bind(this, true, call, 'Flicker enabled');
}
function switchFlickerOff(call) {
  return setFlicker.bind(this, false, call, 'Flicker disabled');
}

const flickerMap = {
  notFound: getArgumentNotFound,
  on: switchFlickerOn,
  yes: switchFlickerOn,
  y: switchFlickerOn,
  off: switchFlickerOff,
  no: switchFlickerOff,
  n: switchFlickerOff,
};

function getFlickerDefault() {
  return [
    'Set flicker with argument:',
    '**on**',
    '**off**'
  ];
}

function getFlicker(call, args, command) {
  let func;
  if (args.length > 1) {
    func = callResponse.bind(this, call, getArgumentInvalid(command, 1));
  } else if (args.length === 1) {
    func = (flickerMap[args[0]] || flickerMap.notFound)(call, args, command);
  } else {
    func = callResponse.bind(this, call, getFlickerDefault());
  }
  return func;
}

commandMap[COMMAND_FLICKER] = getFlicker;
commandMap[COMMAND_FLICKER_ALT1] = getFlicker;

/* *********************** Open ************************** */
export const COMMAND_OPEN = 'open';

function getOpenDefault() {
  return [
    'Open has to be passed a link, currently supported:',
    'Professional',
    '***github***',
    '***source***',
    '***linkedin***',
    'Contact',
    '***email***',
    'Photographs',
    '***500px***',
    '***instagram***',
    getHintSpace(),
    getLinkHint(),
  ];
}

function triggerLink(link) {
  setTimeout(() => {
    ReactGA.event({
      category: 'open',
      action: link,
    });
    window.open(link, '_blank');
  }, 200);
  return [
    `Opening url: ***${link}***`,
    'If window did not open check popup blockers and try again.',
  ];
}

const mailTo = 'mailto:web@andrewlongstaff.com';
const linkMap = {
  notFound: getArgumentNotFound,
  github: triggerLink.bind(this, 'https://github.com/longstaff'),
  source: triggerLink.bind(this, 'https://github.com/longstaff/andrewlongstaff'),
  email: triggerLink.bind(this, mailTo),
  linkedin: triggerLink.bind(this, 'https://www.linkedin.com/in/alongstaff/'),
  instagram: triggerLink.bind(this, 'https://www.instagram.com/andrew.longstaff/'),
};
linkMap['web@andrewlongstaff.com'] = triggerLink.bind(this, mailTo);
linkMap['500px'] = triggerLink.bind(this, 'https://500px.com/longstaff');

function openLink(call, args, command) {
  let res;
  if (args.length > 1) {
    res = getArgumentInvalid(command, 1);
  } else if (args.length === 1) {
    res = (linkMap[args[0]] || linkMap.notFound)(call, args, command);
  } else {
    res = getOpenDefault();
  }
  return callResponse.bind(this, call, res);
}

commandMap[COMMAND_OPEN] = openLink;

/* *********************** Help ************************** */

export const COMMAND_HELP = 'help';
export const COMMAND_HELP_ALT1 = 'man';
const login = 'log in to the admin system, command syntax: username -p password';

const helpList = [
  { command: COMMAND_HELP, man: 'Warning: Cyclical reference detected' },
  { command: COMMAND_COLOURS, man: 'List all the pretty colours of the command output' },
  { command: COMMAND_CLEAR, man: 'Clear the console' },
  { command: COMMAND_ABOUT, man: 'About Andrew Longstaff' },
  { command: COMMAND_PHOTOGRAPHS, man: 'Photography projects of Andrew Longstaff' },
  { command: COMMAND_OPEN, man: 'Open a link' },
  { command: COMMAND_CONTACT, man: 'Contact information' },
  { command: COMMAND_FLICKER, man: 'Adjust animations on website' },

  { command: COMMAND_SUDO, man: login },
  { command: COMMAND_SU, man: login },
  { command: COMMAND_LOGIN, man: login },
];

function filterHelp(val) {
  return val.command !== COMMAND_HELP &&
    val.command !== COMMAND_SUDO &&
    val.command !== COMMAND_SU &&
    val.command !== COMMAND_LOGIN;
}
function getHelpFromArr(arr) {
  const maxLength = arr.reduce((prev, next) => {
    const nextLength = next.command.length > prev ? next.command.length : prev;
    return nextLength;
  }, 0);
  const padding = new Array(maxLength + 1).join(' ');
  const commands = arr.sort((a, b) => {
    if (a.command < b.command) return -1;
    if (a.command > b.command) return 1;
    return 0;
  }).map((val) => {
    const padCommand = `${val.command}${padding}`.slice(0, maxLength + 1);
    return `${padCommand} - ${val.man}`;
  });
  return commands;
}
function getHelp(call, args, command) {
  let res;
  if (args.length) {
    const filtered = helpList.filter(val => args.indexOf(val.command) > -1);
    res = filtered.length === 0 ?
      getArgumentNotFound(call, args.join(), command) : getHelpFromArr(filtered);
  } else {
    res = ['Available commands:'].concat(getHelpFromArr(helpList.filter(filterHelp)));
  }
  return callResponse.bind(this, call, res);
}

commandMap[COMMAND_HELP] = getHelp;
commandMap[COMMAND_HELP_ALT1] = getHelp;

/* *********************************************************************** */
/* **************************** Run Mapper ******************************* */
/* *********************************************************************** */

const splitArguments = (input) => {
  const split = input.split(/\s/).map(val => val.toLowerCase());
  return {
    command: split[0],
    arguments: split.slice(1),
  };
};

/* *********************** Default export ************************** */

export default (call) => {
  const input = splitArguments(call);
  return (commandMap[input.command] || commandMap.notFound)(call, input.arguments, input.command);
};
