const url = require('url');
const http = require('http');
const config = require('./config');

const protocol = config.protocol;
const hostname = config.host;
const port = config.port;

const server = http.createServer((req, res) => {
	let urlParts = url.parse(req.url, true);
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	setTimeout(function() {
		res.end(urlParts.query['i']);
	}, 100);
});

server.listen(port, hostname, () => {
	console.log(`Server running at ${protocol}://${hostname}:${port}/`);
});