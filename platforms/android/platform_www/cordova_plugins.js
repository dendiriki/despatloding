cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-spinnerdialog.SpinnerDialog",
      "file": "plugins/cordova-plugin-spinnerdialog/www/spinner.js",
      "pluginId": "cordova-plugin-spinnerdialog",
      "merges": [
        "window.plugins.spinnerDialog"
      ]
    },
    {
      "id": "cordova-sqlite-storage.SQLitePlugin",
      "file": "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
      "pluginId": "cordova-sqlite-storage",
      "clobbers": [
        "SQLitePlugin"
      ]
    },
    {
      "id": "cordova-plugin-dialogs.notification",
      "file": "plugins/cordova-plugin-dialogs/www/notification.js",
      "pluginId": "cordova-plugin-dialogs",
      "merges": [
        "navigator.notification"
      ]
    },
    {
      "id": "cordova-plugin-dialogs.notification_android",
      "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
      "pluginId": "cordova-plugin-dialogs",
      "merges": [
        "navigator.notification"
      ]
    },
    {
      "id": "cordova-plugin-app-version.AppVersionPlugin",
      "file": "plugins/cordova-plugin-app-version/www/AppVersionPlugin.js",
      "pluginId": "cordova-plugin-app-version",
      "clobbers": [
        "cordova.getAppVersion"
      ]
    },
    {
      "id": "cordova-plugin-keyboard.keyboard",
      "file": "plugins/cordova-plugin-keyboard/www/keyboard.js",
      "pluginId": "cordova-plugin-keyboard",
      "clobbers": [
        "window.Keyboard"
      ]
    },
    {
      "id": "cordova-plugin-ip-mac-address.addressimpl",
      "file": "plugins/cordova-plugin-ip-mac-address/www/addressimpl.js",
      "pluginId": "cordova-plugin-ip-mac-address",
      "clobbers": [
        "addressimpl"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-spinnerdialog": "1.3.2",
    "cordova-sqlite-storage": "3.2.1",
    "cordova-plugin-dialogs": "2.0.2",
    "cordova-plugin-app-version": "0.1.9",
    "cordova-plugin-keyboard": "1.2.0",
    "cordova-plugin-ip-mac-address": "1.0.1"
  };
});