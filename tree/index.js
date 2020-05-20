const fs = require('fs');
const path = require('path');

const readTree = (dir, successClb, errorClb) => {
	let results = {
		files: [],
		dirs: []
	};

	fs.readdir(dir, function(error, list) {

		// error occurred
		if (error && errorClb) {
			return errorClb(error);
		}

		// if dir is empty
		if (!list || !list.length) {
			return successClb(results);
		}

		let fileCount = list.length;

		list.forEach(function(file){
			file = path.resolve(dir, file);
			fs.stat(file, function(error, stat){
				// read sub dir
				if (stat && stat.isDirectory()) {
					results.dirs.push(file);
					readTree(file, res => {
						results.dirs = results.dirs.concat(res.dirs);
						results.files = results.files.concat(res.files);
						--fileCount;
						if (!fileCount) {
							successClb(results);
						}
					});
				// or current dir
				} else {
					results.files.push(file);
					--fileCount;
					if (!fileCount) {
						successClb(results);
					}
				}
			});
		});
	});
};

readTree(
	process.argv[2] || '.',
	data => console.log(JSON.stringify(data)),
	data => console.error(data)
);