var socket = io.connect(location.href),
    lineFeed = [],
    inputPress = 0,

  // dividers
  dividerTimeout = null,
  dividerTime = 2000,
  divider = "---";

// function to add new text to the page
function addLine(string, isUser) {
  var line = $('<pre>');
  if (!!isUser) {
    line.addClass('self');
  }
  line.text(string);
  $('#output').append(line);
}

// add divider
function dividerMessage() {
  addLine(divider);
}

// Start countdown to add divider
function dividerMessageTrigger() {
  dividerTimeout = setTimeout(dividerMessage, dividerTime);
}

// set up sockets
socket.on('write', function (message) {
  if (message.string) {
    addLine(message.string);
  }

  if (message.effect) {
    window[message.effect]();
  }
});
socket.on('disconnect', function () {
  addLine('DISCONNECTED!');
  addLine('Reload to reconnect...');
});


// function to send data
function sendCommand() {
  var theCommand = $('#command').val();
  addLine(theCommand, true);
  socket.emit('command', theCommand);
  $('#command').val('').focus();

  lineFeed.unshift(theCommand);

  if (lineFeed.length === 50) {
    lineFeed.pop();
  }

  $('html, body').animate({scrollTop: $(document).height()}, 'slow');

  // divider...
  clearTimeout(dividerTimeout);
  dividerMessageTrigger();
}

// function to deal with key up and down line feed
function recallCommand() {
  var lastCommand = lineFeed[inputPress];
  $('#command').val(lastCommand);

  if (inputPress < 0) {
    inputPress = 0;
  }

  if (inputPress > lineFeed.length) {
    inputPress = lineFeed.length;
  }
}

$('#send').click(sendCommand);
$('#command').keyup(function (e) {
  if (e.keyCode === 13) {
    inputPress = 0;
    sendCommand();
  }
});
$('#command').keyup(function (e) {
  if (e.keyCode === 38) {
    recallCommand();
    inputPress++;
  }
});
$('#command').keyup(function (e) {
  if (e.keyCode === 40) {
    recallCommand();
    inputPress--;
  }
});


// init the page on load
function init() {
  var welcome, $line, counter, length;
  welcome = '              _                 _       \n _ _  ___  __| |_____ _____ _ _| |_ _  _ _ _ ___ \n| \' \\/ _ \\/ _` / -_) V / -_) \' \\  _| || | \'_/ -_)\n|_||_\\___/\\__,_\\___|\\_/\\___|_||_\\__|\\_,_|_| \\___|';
  $line = $('<pre id="welcome">');
  $('#output').append($line);

  counter = 0;
  length = welcome.length;
  addChar();

  // add characters, one at a time
  function addChar() {
    $line.append(welcome.charAt(counter));
    
    // are we still adding chars?
    if (counter++ < length) {

      // don't delay on spaces
      if (welcome.charAt(counter) === " ") {
        addChar();
      } else {
        setTimeout(addChar, 25);
      }
    
    // we've finished adding characters, init
    }
  }
}


// pointless effects
function blur() {
  $('body').addClass('blurry');
}

var colours = ['#ff0000', '#00ff00', '#0000ff', '#cc9943'];
function wooaah() {
  var colourA = colours[Math.floor(Math.random() * colours.length)];
  var colourB = colours[Math.floor(Math.random() * colours.length)];
  $('pre').animate({color: colourA}, Math.random() * 500);
  $('body').animate({backgroundColor: colourB}, Math.random() * 800, wooaah);
}

// locally store the username
var storedUsername = localStorage.getItem("username") || "";
var username = prompt("Name?", storedUsername);
localStorage.setItem("username", username);

// INIT !
socket.emit('login', username);
init();
addLine('Connecting...');
$("input#command").focus();
