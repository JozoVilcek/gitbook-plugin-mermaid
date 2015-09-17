var join         = require('path').join;
var readFileSync = require('fs').readFileSync;
var resolve      = require('url').resolve;

var phantom = require('phantom');
var Q       = require('q');


module.exports = {
  blocks: {
    mermaid: {
      process: function(block) {
        var body = block.body;

        var src = block.kwargs.src;
        if(src)
        {
          var path = decodeURI(resolve(this.ctx.file.path, src));
          body = readFileSync(path, 'utf8');
        }

        return processBlock(body);
      }
    }
  }
};

function processBlock(body) {
  return convertToSvg(body)
      .then(function (svgCode) {
          return svgCode.replace(/mermaidChart1/g, getId());
      });
}

function convertToSvg(mermaidCode) {
  var deferred = Q.defer();
  phantom.create(function (ph) {
    ph.createPage(function (page) {

      var htmlPagePath = join(__dirname, 'convert/converter.html');

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
