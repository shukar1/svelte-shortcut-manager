let numbers = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ];

export const Keys = {
  /* Meta */
  MetaRight: {
    code: 'MetaRight',
    symbol: '⌘'
  },
  MetaLeft: {
    code: 'MetaLeft',
    symbol: '⌘'
  },
  MetaAny: {
    code: [ 'MetaRight', 'MetaLeft' ],
    symbol: '⌘'
  },
  /* Shift */
  ShiftRight: {
    symbol: '⇧'
  },
  ShiftLeft: {
    symbol: '⇧'
  },
  ShiftAny: {
    code: [ 'ShiftRight', 'ShiftLeft' ],
    symbol: '⇧'
  },
  /* Alt */
  AltLeft: {
    code: 'AltLeft',
    symbol: '⌥'
  },
  AltRight: {
    code: 'AltRight',
    symbol: '⌥'
  },
  AltAny: {
    code: [ 'AltRight', 'AltLeft' ],
    symbol: '⌥'
  },
  /* Control */
  ControlRight: {
    code: 'ControlRight',
    symbol: '⌃'
  },
  ControlLeft: {
    code: 'ControlLeft',
    symbol: '⌃'
  },
  ControlAny: {
    code: [ 'ControlLeft', 'ControlRight' ],
    symbol: '⌃'
  },
  /* A-Z */
  ...(Object.assign({}, ...Array.from({ length: 26 }).map((_, i) => {
    let letter = String.fromCharCode(i + 65);
    return {
      [letter]: {
        code: 'Key' + letter,
        symbol: letter
      }
    };
  }))),
  /* 0-9 */
  ...(Object.assign({}, ...numbers.map(num => {
    let code = 'Digit' + num;
    return {
      [code]: {
        code,
        symbol: num
      }
    };
  }))),
  /* 0-9 Numpad */
  ...(Object.assign({}, ...numbers.map(num => {
    let code = 'Numpad' + num;
    return {
      [code]: {
        code,
        symbol: num
      }
    };
  }))),
  /* 0-9 combined */
  ...(Object.assign({}, ...numbers.map(num => {
    return {
      [num + 'Any']: {
        code: [ 'Digit' + num, 'Numpad' + num ],
        symbol: num
      }
    };
  }))),
  NumpadMultiply: {
    symbol: '*',
    code: 'NumpadMultiply'
  },
  /* Enter */
  NumpadEnter: {
    symbol: '⌤',
    code: 'NumpadEnter'
  },
  Enter: {
    symbol: '⌤',
    code: 'Enter'
  },
  EnterAny: {
    code: [ 'Enter', 'NumpadEnter' ],
    symbol: '⌤'
  },
  NumpadAdd: {
    code: 'NumpadAdd',
    symbol: '+'
  },
  NumpadEqual: {
    code: 'NumpadEqual',
    symbol: '='
  },
  Equal: {
    code: 'Equal',
    symbol: '='
  },
  EqualAny: {
    code: [ 'Equal', 'NumpadEqual' ],
    symbol: '='
  },
  NumLock: {
    code: 'NumLock',
    symbol: '⌧'
  },
  /* Minus */
  NumpadSubtract: {
    code: 'NumpadSubtract',
    symbol: '-'
  },
  MinusAny: {
    code: [ 'NumpadSubtract', 'Minus' ],
    symbol: '-'
  },
  Minus: {
    code: 'Minus',
    symbol: '-'
  },
  Tab: {
    code: 'Tab',
    symbol: '⇥'
  },
  Space: {
    code: 'Space',
    symbol: '␣'
  },
  Backspace: {
    code: 'Backspace',
    symbol: '⌫'
  },
  IntlBackslash: {
    code: 'IntlBackslash',
    symbol: '`'
  },
  Slash: {
    code: 'Slash',
    symbol: '/'
  },
  Backslash: {
    code: 'Backslash',
    symbol: '\\'
  },
  Delete: {
    code: 'Delete',
    symbol: '⌦'
  },
  Quote: {
    code: 'Quote',
    symbol: '\''
  },
  Escape: {
    code: 'Escape',
    symbol: '⎋'
  },
  CapsLock: {
    code: 'CapsLock',
    symbol: '⇪'
  },
  /* Arrows */
  ArrowUp: {
    code: 'ArrowUp',
    symbol: '↑'
  },
  ArrowLeft: {
    code: 'ArrowLeft',
    symbol: '←'
  },
  ArrowRight: {
    code: 'ArrowRight',
    symbol: '→'
  },
  ArrowDown: {
    code: 'ArrowDown',
    symbol: '↓'
  }
};
