
var serial = require( "serialport" );
var SerialPort = serial.SerialPort;

// Replace with the device name in your machine.
var portName = "/dev/tty.usbserial-A6008e4J";

var sp = new SerialPort( portName, {
	baudrate:9600,
	parser:serial.parsers.readline("\n")
});

var acceptingUser1 = true;
var acceptingUser2 = true;
var acceptingUser3 = true;

var newTag;
var oldTag;

module.exports = {
	init:function(socket){
		/* When we get a new line from the arduino, send it to the browser via this socket */
		sp.on( "data", function ( data ) {
			//console.log(data);
			var user1 = "#4260216534";
			var user2 = "#1303288823";
			var user3 = "#1033937143";

			if(data.indexOf(user1) > -1) {
				var newTag = user1;
				if(newTag != oldTag){
					console.log("user1");
					socket.emit("message", "user1");
					oldTag = user1;
					setTimeout(function(){oldTag = 0},10000);
				}
			}

			if(data.indexOf(user2) > -1) {
				var newTag = user2;
				if(newTag != oldTag){
					console.log("user2");
					socket.emit("message", "user2");
					oldTag = user2;
					setTimeout(function(){oldTag = 0},10000);
				}
			}

			if(data.indexOf(user3) > -1) {
				var newTag = user3;
				if(newTag != oldTag){
					console.log("user3");
					socket.emit("message", "user3");
					oldTag = user3;
					setTimeout(function(){oldTag = 0},10000);
				}
			}

		});
	}
};

