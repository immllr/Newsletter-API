var express = require("express");
var app = express();
var fs = require('fs');

app.listen(3030, () => {
    console.log("Server running on port 3030");
});

app.get("/headline/:reqDevice/:reqFontFamily/:reqFontSize/:reqFontColor/:reqLineHeight/:reqBackground/:reqPadding/:reqText", (req, res, next) => {
    var text2png = require('text2png');
    res.writeHead(200, {"Content-Type": "image/png"});
    res.write(text2png(req.params.reqText, {
        color: "#"+req.params.reqFontColor,
        padding: parseInt(req.params.reqPadding),
        backgroundColor: "#"+req.params.reqBackground
    }));
    res.stop();

    /*res.json([{ 'Device': req.params.reqDevice,
                'font-family': req.params.reqFontFamily,
                'font-size': req.params.reqFontSize,
                'color': req.params.reqFontColor,
                'line-height': req.params.reqLineHeight,
                'background': req.params.reqBackground,
                'padding': req.params.reqPadding,
                'text': req.params.reqText
    }]);
    console.log(req.params.reqDevice);


    var text2png = require('text2png');
    fs.writeFileSync('out.png', text2png(req.params.reqText, {
        color: req.params.reqFontColor,
        padding: parseInt(req.params.reqPadding)
    }));*/

});
