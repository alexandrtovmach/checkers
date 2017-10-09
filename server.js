var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')

var app = require('express')();

var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
})
app.get("/bg.png", function(req, res) {
    res.sendFile(__dirname + '/bg.png');
})

app.listen(port, function(error) {
    if (error) {
        console.error(error)
    } else {
        console.info("Easy Checkers here http://localhost:%s/", port)
    }
})

