var phantom = require("phantom");
var Q = require('q');
var path = require('path');


module.exports = {
  blocks: {
    mermaid: {
      process: function(blk) {
        return processBlock(blk);
      }
    }
  }
};

function processBlock(block) {
  return convertToSvg(block.body)
      .then(function (svgCode) {
          return svgCode.replace(/mermaidChart1/g, getId());
      });
}

function convertToSvg(mermaidCode) {

  var deferred = Q.defer();
  phantom.create(function (ph) {
    ph.createPage(function (page) {

      var htmlPagePath = path.join(__dirname, 'convert/converter.html');

      page.open(htmlPagePath, function (status) {
        page.evaluate(
          function (code) {
            return renderToSvg(code);
          },
          function (result) {
            ph.exit();
            deferred.resolve(result);
          },
          mermaidCode);
      });
    });
  });

  return deferred.promise;
}

function getId() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return "mermaidChart-" + s4() + s4();
}