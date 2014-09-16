var	child_process = require("child_process");
var spawn = child_process.spawn;

var clique = function(settings){
	this.tasks = [];
	this.current_task = 0;

	this.settings = {
		max_buffer: 1,
		megabyte: 1048576
	};
}

// Single break line
clique.prototype.__sbl = function(str){
	if(str){
		return str.replace(/\r\n/g, '\n')
	}else{
		return str;
	}
}

// Add tasks to quee
clique.prototype.addTask = function(task){
	this.tasks.push(task);
}

// Select next task
clique.prototype.__nextTask = function(taks){
	this.current_task++;
	if(this.current_task < this.tasks.length){
		this.__runTask(this.tasks[this.current_task], this.current_task);
	}else{
		if(this.onqueedone){
			this.onqueedone();
		}
	}
}

// Run a task
clique.prototype.__runTask = function(task, index){
	var self = this;

	if(task.stream){
		
		var cli = spawn(task.bin, task.args);

		cli.stdout.on('data', function (data) {
			if(task.stdout){
				task.stdout(self.__sbl(data.toString()), index);
			}
		});

		cli.stderr.on('data', function (data) {
			if(task.stderr){
				task.stderr(self.__sbl(data.toString()), index);
			}
		});

		cli.on('close', function (code) {
			if(task.close){
				task.close(code, index);
			}
			self.__nextTask();
		});

	}else{

		var max_buffer = task.max_buffer || self.settings.max_buffer;
		max_buffer = max_buffer*self.settings.megabyte;

		child_process.execFile(task.bin, task.args, { 
			encoding: 'utf8',
			maxBuffer: max_buffer
		}, function(err, stdout, stderr) {
			if(err){
			}
			if(task.stdout){
				task.stdout(self.__sbl(stdout), index);
			}
			if(task.stderr){
				task.stderr(self.__sbl(stderr), index);
			}
			if(task.close){
				task.close(err, index);
			}
			if(task.allstd){
				task.allstd(err, self.__sbl(stdout), self.__sbl(stderr), index)
			}
			self.__nextTask();
		});
	}
}

// Trigger when done
clique.prototype.done = function(cb){
	this.onqueedone = cb;
}

// Run the quee
clique.prototype.run = function(done){
	this.__runTask(this.tasks[this.current_task], this.current_task);
}

// Exports
module.exports = clique;