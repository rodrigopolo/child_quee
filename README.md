Child Quee
==========

A simple child process quee handler for Node.js

To install:
```
npm install child_quee
```

Usage:
```
// Require
var child_quee = require("./");

// Init
var quee = new child_quee();

// First item on quee
quee.addTask({
	stream: true,
	max_buffer: 5,
	bin: 'ping',
	args: ['google.com','-c','5'],
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
	bin: 'ls',
	args: ['-la'],
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

```

## License

(The MIT License)

Copyright (c) by Rodrigo Polo http://RodrigoPolo.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.