import fs from "node:fs";

const packageJson = JSON.parse(fs.readFileSync("../package.json", "utf8"));

const gameUrl = "https://*.idle-mmo.com/*";

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = {
  manifest_version: 3,
  default_locale: "en",
  name: "__MSG_extensionName__",
  version: packageJson.version,
  description: "__MSG_extensionDescription__",
  host_permissions: [gameUrl],
  permissions: ["storage", "scripting"],
  background: {
    service_worker: "background.iife.js",
    type: "module",
  },
  action: {
    default_popup: "popup/index.html",
    default_icon: "icon-34.png",
  },
  icons: {
    128: "icon-128.png",
  },
  content_scripts: [
    {
      matches: [gameUrl],
      js: ["content/index.iife.js"],
    },
    {
      matches: [gameUrl],
      js: ["content-ui/index.iife.js"],
    },
    {
      matches: [gameUrl],
      css: ["content.css"], // public folder
    },
  ],
  web_accessible_resources: [
    {
      resources: ["*.js", "*.css", "*.svg", "icon-128.png", "icon-34.png"],
      matches: ["*://*/*"],
    },
  ],
};

export default manifest;
