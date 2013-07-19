var express = require('express'),
    app = express(),
    port = parseInt(process.env.PORT, 10) || 8080,
    appDir = "";

/* Middleware */
app.use(express.static(__dirname + "/" + appDir));
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.logger('dev'));  //default, short, tiny, dev
app.use(app.router);
app.use(express.errorHandler({dumpExceptions: true, showStack: true, showMessage: true}));

/* Server port */
app.listen(port, function () {
    console.log("Server started at http://localhost:" + port + "/" + appDir);
});
