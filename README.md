# karma-firefox-launcher

> Launcher for Mozilla Firefox.

## Installation

The easiest way is to keep `karma-firefox-launcher` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-firefox-launcher": "~0.1"
  }
}
```

You can simple do it by:
```bash
npm install karma-firefox-launcher --save-dev
```

## Configuration
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    browsers: ['Firefox', 'FirefoxDeveloper', 'FirefoxAurora', 'FirefoxNightly'],
  });
};
```

You can pass list of browsers as a CLI argument too:
```bash
karma start --browsers Firefox,Chrome
```

To configure preferences for the Firefox instance that is loaded, you can specify a custom launcher in your Karma
config with the preferences under the `prefs` key:

```js
browsers: ['FirefoxAutoAllowGUM'],

customLaunchers: {
    FirefoxAutoAllowGUM: {
        base: 'Firefox',
        prefs: {
            'media.navigator.permission.disabled': true
        }
    }
}
```

Alternatively, if you have more advanced use cases, you can specify the full path to a profile you wish the browser
to use in the `profile` key:

```js
browsers: ['FirefoxCustomProfile'],

customLaunchers: {
    FirefoxCustomProfile: {
        base: 'Firefox',
        profile: '/users/liz/profiles/firefoxCustomProfile/'
    }
}
```

To learn more about setting up a custom firefox profile, see [this mozilla support article]
(https://support.mozilla.org/en-US/kb/profile-manager-create-and-remove-firefox-profiles).

**Note**: `prefs` and `profile` are mutually exclusive. If you specify a `profile`, the `prefs` will not be set.

----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
