/* jshint indent: false */

'use strict';

var eventCategoryDao = require('/dao/eventCategoryDao.js');

var postEventCategory = function(req, res) {
    var eventCategory = (req.getContent());

    if (!eventCategory.name) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Event Category should contain name'
        };
    }

    eventCategoryDao.createEventCategory(eventCategory);
        res.status = 200;
}

var putEventCategory = function(req, res) {
    var eventCategory = (req.getContent());

    if (!eventCategory.name) {
        res.status = 400;
        res.contentType = 'application/json';
        res.content = {
            message: 'Event Category should contain name'
        };

        eventCategoryDao.updateEventCategory(eventCategory, req._params.id);
        res.status = 200;
    }
}

var getEventCategoryByEventCategoryId = function(req, res) {
    var eventCategoryId = req._params.id;
    if (eventCategoryId) {
        var result = eventCategoryDao.getEventCategoryByEventCategoryId(Number(eventCategoryId));
        if(result){
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        }
    }
}

var getEventCategories = function (req, res) {
  var result = eventCategoryDao.getEventCategories();
  if(result){
      res.status = 200;
      res.contentType = "application/json";
      res.content = result;
  }
}

var getEventCategoryWithEvents = function(req, res) {
    var eventCategoryId = req._params.id;

    if (eventCategoryId) {
        res.status = 200;
        var result = eventCategoryDao.getEventCategoryWithEvents(Number(eventCategoryId));
        if(result){
            res.status = 200;
            res.contentType = "application/json";
            res.content = result;
        }
    }
}
