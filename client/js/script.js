var socket = io.connect('http://localhost');

socket.on('write', function (string) {
  var line = $('<pre>');
  line.text(string);
  $('#output').append(line);
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
