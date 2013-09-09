var fs = require('fs');
var spawn = require('child_process').spawn;


var PREFS =
    'user_pref("browser.shell.checkDefaultBrowser", false);\n' +
    'user_pref("browser.bookmarks.restore_default_bookmarks", false);\n';


// Return location of firefox.exe file for a given Firefox directory
// (available: "Mozilla Firefox", "Aurora", "Nightly").
function getFirefoxExe(firefoxDirName) {
  var windowsFirefoxDirectory, i, prefix;
  var suffix = '\\'+ firefoxDirName + '\\firefox.exe';
  var prefixes = [process.env.PROGRAMFILES, process.env['PROGRAMFILES(X86)']];

  for (i = 0; i < prefixes.length; i++) {
    prefix = prefixes[i];
    if (fs.existsSync(prefix + suffix)) {
      windowsFirefoxDirectory = prefix + suffix;
      break;
    }
  }

  return windowsFirefoxDirectory;
}

// https://developer.mozilla.org/en-US/docs/Command_Line_Options
var FirefoxBrowser = function(id, baseBrowserDecorator, logger) {
  baseBrowserDecorator(this);

  var log = logger.create('launcher');

  this._start = function(url) {
    var self = this;
    var command = this._getCommand();

    fs.createWriteStream(self._tempDir + '/prefs.js', {flags: 'a'}).write(PREFS);
    self._execCommand(command, [url, '-profile', self._tempDir, '-no-remote']);
  };
};


FirefoxBrowser.prototype = {
  name: 'Firefox',

  DEFAULT_CMD: {
    linux: 'firefox',
    darwin: '/Applications/Firefox.app/Contents/MacOS/firefox-bin',
    win32: getFirefoxExe('Mozilla Firefox')
  },
  ENV_CMD: 'FIREFOX_BIN'
};

FirefoxBrowser.$inject = ['id', 'baseBrowserDecorator', 'logger'];


var FirefoxAuroraBrowser = function(id, baseBrowserDecorator, logger) {
  FirefoxBrowser.call(this, id, baseBrowserDecorator, logger);
};

FirefoxAuroraBrowser.prototype = {
  name: 'FirefoxAurora',
  DEFAULT_CMD: {
    linux: 'firefox',
    darwin: '/Applications/FirefoxAurora.app/Contents/MacOS/firefox-bin',
    win32: getFirefoxExe('Aurora')
  },
  ENV_CMD: 'FIREFOX_AURORA_BIN'
};

FirefoxAuroraBrowser.$inject = ['id', 'baseBrowserDecorator', 'logger'];


var FirefoxNightlyBrowser = function(id, baseBrowserDecorator, logger) {
  FirefoxBrowser.call(this, id, baseBrowserDecorator, logger);
};

FirefoxNightlyBrowser.prototype = {
  name: 'FirefoxNightly',

  DEFAULT_CMD: {
    linux: 'firefox',
    darwin: '/Applications/FirefoxNightly.app/Contents/MacOS/firefox-bin',
    win32: getFirefoxExe('Nightly')
  },
  ENV_CMD: 'FIREFOX_NIGHTLY_BIN'
};

FirefoxNightlyBrowser.$inject = ['id', 'baseBrowserDecorator', 'logger'];


// PUBLISH DI MODULE
module.exports = {
  'launcher:Firefox': ['type', FirefoxBrowser],
  'launcher:FirefoxAurora': ['type', FirefoxAuroraBrowser],
  'launcher:FirefoxNightly': ['type', FirefoxNightlyBrowser]
};
