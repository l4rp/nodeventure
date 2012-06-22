var socket = io.connect(location.href);

function addLine(string) {
  var line = $('<pre>');
  line.text(string);
  $('#output').append(line);
}

socket.on('write', function (message) {
  if (message.string) {
    addLine(message.string);
  }
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


// JS finished initing, focus on text area
$("input#command").focus();