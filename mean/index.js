const express = require('express');
const app = express();

app.use('/hello/:id', (req, res, next) => {
	console.log('Request Type:', req.method);
	next();
});

app.get('/hello/:id?', (req, res) => {
	res.send('Hello ' + req.params.id);
});

app.listen(3000);