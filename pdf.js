var fs = require('fs')
var page = require('webpage').create();
page.viewportSize = { 
  width: 1200, 
  height: 800 
};
// page.clipRect = { width: 1200, height: 800 };
page.paperSize = { 
  format: 'A4', 
  orientation: 'portrait', 
  margin: '0cm',
};

page.open('file://' + fs.workingDirectory + '/index.html', function() {
  page.render('CV_JulianHundeloh.pdf');
  phantom.exit();
});