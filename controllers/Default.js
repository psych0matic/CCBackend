'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.countriesGET = function countriesGET (req, res, next) {
  Default.countriesGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.countriesNameGET = function countriesNameGET (req, res, next, name) {
  Default.countriesNameGET(name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
