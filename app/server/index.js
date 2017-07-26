var express = require('express');
var app = express();
var router = require('./router');
app.use('/api', router);

app.listen(process.env.PORT || 3412)

var path = require('path');
app.use(express.static(path.join(__dirname, '../public' )));
