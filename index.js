var self = require('sdk/self');

var proxyOnIcon = {
  "16": "./green_16.png",
  "32": "./green_32.png",
  "64": "./green_64.png"
};

var proxyOffIcon = {
  "16": "./grey_16.png",
  "32": "./grey_32.png",
  "64": "./grey_64.png"
};

var proxyOnLabel = "Proxy is On - press ctrl+shift+X to turn off";
var proxyOffLabel = "Proxy is Off - press ctrl+shift+X to turn on";

var initialIcon = proxyOnIcon;
var initialLabel = proxyOnLabel;

var service = require("sdk/preferences/service");

// possible values for network.proxy.type
var proxyNone = 0; // No proxy
var proxyManual = 1; // Manual proxy configuration
var proxyAuto = 4; // Auto-detect proxy settings for this network
var proxySystem = 5; // Use system proxy settings (Firefox default)

var proxyOff = proxySystem;
var proxyOn = proxyManual;

// TODO: save user proxyOff configuration in case she closes the browser
//  note that not doing so will possibly change user's proxyOff configuration
//  whenever she re-opens Firefox
switch(service.get("network.proxy.type")) {
  case proxyNone:
    proxyOff = proxyNone;
    break;
  case proxyAuto:
    proxyOff = proxyAuto;
    break;
}

if(service.get("network.proxy.type") == proxyOff) {
  initialIcon = proxyOffIcon;
  initialLabel = proxyOffLabel;
}

var { ActionButton } = require("sdk/ui/button/action");
var button = ActionButton({
  id: "noturno-state",
  label: initialLabel,
  icon: initialIcon,
  onClick: toggleProxyConfig
});

var { Hotkey } = require("sdk/hotkeys");
var showHotKey = Hotkey({
  combo: "accel-shift-x",
  onPress: toggleProxyConfig
});

function toggleProxyConfig() {
  if(service.get("network.proxy.type") == proxyOff) {
    service.set("network.proxy.type", proxyOn);
    button.icon = proxyOnIcon;
    button.label = proxyOnLabel;
  }
  else {
    service.set("network.proxy.type", proxyOff);
    button.icon = proxyOffIcon;
    button.label = proxyOffLabel;
  }
}

module.exports.proxyOnLabel = proxyOnLabel
module.exports.proxyOffLabel = proxyOffLabel
module.exports.toggleProxyConfig = toggleProxyConfig

