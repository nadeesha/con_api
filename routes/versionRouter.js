/* jshint indent: false */

'use strict';

var versionDao = require('/dao/versionDao.js');

var getVersion = function (req, res) {
    res.status = 200;
    res.contentType = "application/json";
    res.content = versionDao.getVersion();
}
