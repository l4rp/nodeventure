var socket = io.connect(location.href);

function addLine(string) {
  var line = $('<pre>');
  line.text(string);
  $('#output').append(line);
}

socket.on('write', function (string) {
  addLine(string);
});

socket.on('disconnect', function () {
  addLine('DISCONNECTED!');
  addLine('Reload to reconnect...');
});

socket.emit('login', prompt("Name?"));

function sendCommand() {
  socket.emit('command', $('#command').val());
  $('#command').val('').focus();
}

$('#send').click(sendCommand);
$('#command').keyup(function (e) {
  if (e.keyCode === 13) {
    sendCommand();
  }
});

addLine('Connecting...');


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

// JS finished initing, focus on text area
$("input#command").focus();