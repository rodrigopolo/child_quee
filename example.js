// Linux / OS X Commands
var tast1_bin = 'ping';
var tast1_arg = ['google.com','-c','5'];

var tast2_bin = 'ls';
var tast2_arg = ['-la'];

// Windows Commands
if(/^win/.test(process.platform)){
	tast1_bin = 'cmd';
	tast1_arg = ['/c','ping','google.com','-n','5'];

	tast2_bin = 'cmd';
	tast2_arg = ['/c','dir','/a'];
}

// Require Child Quee, you should use require("child_quee")
var child_quee = require("./");

// Init
var quee = new child_quee();

// First item on quee
quee.addTask({
	stream: true,
	max_buffer: 5,
	bin: tast1_bin,
	args: tast1_arg,
	stdout: function(str){
		console.log('stdout: ' + str);
	},
	stderr: function(str){
		console.log('stderr: ' + str);
	},
	close: function(code){
		console.log('child process exited with code ' + code);
	}
});

// Second item on quee
quee.addTask({
	stream: false,
	bin: tast2_bin,
	args: tast2_arg,
	stdout: function(str){
		console.log('stdout: ' + str);
	},
	stderr: function(str){
		console.log('stderr: ' + str);
	},
	close: function(code){
		console.log('child process exited with code ' + code);
	}
});

// When quee is done
quee.done(function(){
	console.log('All task compleated.');
});

// Start quee
quee.run();