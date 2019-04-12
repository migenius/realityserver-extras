'use strict';

module.exports = {

  "plugins": ["plugins/markdown"],
  "recurseDepth": 10,
  "source": {
    "include": [ "src" ],
    "includePattern": ".+\\.js(doc|x)?$",
    "excludePattern": "(^|\\/|\\\\)_"
  },
  "sourceType": "module",
  "tags": {
    "allowUnknownTags": true,
    "dictionaries": [
      "jsdoc",
      "closure"
    ]
  },
  "templates": {
    "applicationName": "RealityServer&reg; Extras",
    "cleverLinks": false,
    "monospaceLinks": false
  },
  "opts": {
    "encoding": "utf8",
    "destination": "./docs/",
    "recurse": true,
    "template": "./node_modules/@migenius/jsdoc-template",
    "readme": "static/README.md"
  }
}
