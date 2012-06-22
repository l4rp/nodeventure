var socket = io.connect(location.href),

  // dividers
  dividerTimeout = null,
  dividerTime = 2000,
  divider = "---";

// function to add new text to the page
function addLine(string) {
  var line = $('<pre>');
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
socket.on('write', function (string) {
  addLine(string);
});
socket.on('disconnect', function () {
  addLine('DISCONNECTED!');
  addLine('Reload to reconnect...');
});


// function to send data
function sendCommand() {
  socket.emit('command', $('#command').val());
  $('#command').val('').focus();

  $('html, body').animate({scrollTop: $(document).height()}, 'slow');

  // divider...
  clearTimeout(dividerTimeout);
  dividerMessageTrigger();
}

$('#send').click(sendCommand);
$('#command').keyup(function (e) {
  if (e.keyCode === 13) {
    sendCommand();
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
    } else {
      $("input#command").focus();
    }
  }
}

// INIT !

socket.emit('login', prompt("Name?"));
init();
addLine('Connecting...');
