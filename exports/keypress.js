const { GlobalKeyboardListener } = require("node-global-key-listener");
const keypress = new GlobalKeyboardListener();
let _lastKeyPressed = "";
let _keysToListen = [];
let _callback;

keypress.addListener(function ({ name, state }, down) {
  _refTable.hasOwnProperty(name) ? name = _refTable[name] : ''
  name.toUpperCase()
  if (
    state == "DOWN" &&
    name != _lastKeyPressed && _keysToListen.includes(name)
  ) {
    _callback({ name, state });
    _lastKeyPressed = name;
  }
});

function keysToListen(keys) {
  _keysToListen = keys.map((el) => el.toUpperCase());
}
function keypressCallback(callback) {
  _callback = callback;
}

const _refTable = {
  SECTION: "`",
  MINUS: "-",
  EQUALS: "=",
  "SQUARE BRACKET OPEN": "[",
  "SQUARE BRACKET CLOSE": "]",
  BACKSLASH: '\\',
  SEMICOLON: ";",
  QUOTE: "\'",
  COMMA: ",",
  DOT: ".",
  "FORWARD SLASH": "/",
};

module.exports = { keypress, keysToListen, keypressCallback };
