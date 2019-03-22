var express = require("express");
var fs = require('fs');
var webshot = require('webshot');
var app = express();


/**
 *
 * @returns {number}
 */
String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};


app.listen(3030, () => {
    console.log("Server running on port 3030");
});

app.get("/headline/:reqDevice/:reqFontFamily/:reqFontSize/:reqFontColor/:reqLineHeight/:reqBackground/:reqPadding/:reqText", (req, res, next) => {

    var rawID = req.params.reqDevice + req.params.reqFontFamily + req.params.reqFontSize + req.params.reqFontColor + req.params.reqLineHeight + req.params.reqBackground + req.params.reqPadding + req.params.reqText;
    rawID = rawID.toString().hashCode();
    console.log("[LOG] image ID " + rawID + " requested");


    fs.exists('cache/' + rawID + '.png', function(exists) {
        if (exists) {
            console.log("[LOG] image ID " + rawID + " is cached");
            fs.readFile('cache/' + rawID + '.png', function (err,data) {
                if (err) {
                    return console.log(err);
                }
                res.writeHead(200, {"Content-Type": "image/png"});
                res.write(data);
                console.log("[LOG] image ID " + rawID + "delivered");
            });

        } else {
            console.log("[LOG] image ID " + rawID + " not cached");

            var options = {
                windowSize: { width: 600
                    , height: 'auto' },
                shotSize: {
                    width: 600
                },
                siteType:'html',
                quality: 100
            };

            var htmlCode = "<html><head><link href=\"https://fonts.googleapis.com/css?family=Indie+Flower\" rel=\"stylesheet\"><style>* { box-sizing: border-box } body { width: 600px; margin: 0; background-color: "+req.params.reqBackground+" } h1 { -moz-osx-font-smoothing: grayscale; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; font-family:"+req.params.reqFontFamily+"; font-size: "+req.params.reqFontSize+"; color: "+req.params.reqFontColor+" }</style></head><body><h1>"+req.params.reqText+"</h1></body></html>"

            webshot(htmlCode, 'cache/' + rawID + '.png', options, function(err) {
                fs.readFile('cache/' + rawID + '.png', function (err,data) {
                    if (err) {
                        return console.log(err);
                    }
                    res.writeHead(200, {"Content-Type": "image/png"});
                    res.write(data);
                    console.log("[LOG] image ID " + rawID + "delivered");
                });
            });

            console.log("[LOG] image ID " + rawID + " generated and delivered");
        }
    });

});

