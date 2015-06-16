var phantom = require("phantom");
var Q = require('q');
var path = require('path');
var cheerio = require("cheerio");


module.exports = {
  book: {
    assets: "./book",
    js: [
      "plugin.js"
    ]
  },
  hooks: {
    page: function(page) {
      return processPage(page);
    }
  }
};


function processPage(page) {

    var deferred = Q.defer();

    Q.all(page.sections.map(function (section) {
        var $ = cheerio.load(section.content);
        return Q.all($(".lang-mermaid").map(function(i, n) {
            var codeNode = $(n);
            return convertToSvg(codeNode.html())
                .then(function (svgCode) {
                    var $ = cheerio.load(svgCode);
                    codeNode.parent().replaceWith($.html());
                });
        })).then(function () {
            section.content = $.html();
        });
    })).then(function() {
        deferred.resolve(page);
    });

    return deferred.promise;
}


function convertToSvg(mermaidCode) {

  var deferred = Q.defer();
  phantom.create(function (ph) {
    ph.createPage(function (page) {

//      page.injectJs('../dist/mermaid.min.js')

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