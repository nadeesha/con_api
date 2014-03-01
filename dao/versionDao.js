/* jshint indent: false */

'use strict';

var db = require('./db.js').db;
var utils = require('./utils.js');

var getVersion = function () {
    var result = db.query('SELECT MAX(version_number) AS versionNumber FROM tbl_version');

    return result;
}