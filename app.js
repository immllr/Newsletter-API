var express = require("express");
var fs = require('fs');
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

    /*res.json([{ 'Device': req.params.reqDevice,
                'font-family': req.params.reqFontFamily,
                'font-size': req.params.reqFontSize,
                'color': req.params.reqFontColor,
                'line-height': req.params.reqLineHeight,
                'background': req.params.reqBackground,
                'padding': req.params.reqPadding,
                'text': req.params.reqText
    }]);*/
    let rawID = req.params.reqDevice + req.params.reqFontFamily + req.params.reqFontSize + req.params.reqFontColor + req.params.reqLineHeight + req.params.reqBackground + req.params.reqPadding + req.params.reqText;



    fs.exists('cache/' + rawID.toString().hashCode() + '.png', function(exists) {
        if (exists) {
            fs.readFile('cache/' + rawID.toString().hashCode() + '.png', function (err,data) {
                if (err) {
                    return console.log(err);
                }
                res.writeHead(200, {"Content-Type": "image/png"});
                res.write(data);
            });

        } else {
            console.log('NOT OK');
        }
    });

});

