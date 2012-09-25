var _ = require('underscore');


/*
 * Serve JSON to our AngularJS client
 */

// For a real app, you'd make database requests here.
// For this example, "data" acts like an in-memory "database"
var data = {};
data.production = {
  id: 3,
  name: "Production",
  version: "2.5",
  tests: [{
    name: 'Test 1',
    id: 1,
    status: 'pass',
    timestamp: 'September 24, 2012 23:48',
    timeAgo: '30 minutes ago'
  }, {
    name: "Test 2",
    id: 2,
    status: 'fail',
    timestamp: 'September 24, 2012 23:48',
    timeAgo: '15 minutes ago'
  }, {
    name: 'Test 3',
    id: 3,
    reason: 'Host unreachable',
    status: 'warning',
    timestamp: 'September 24, 2012 23:48',
    timeAgo: '30 minutes ago'
  }, {
    name: 'Test 4',
    id: 4,
    status: 'pass',
    reason: 'Host unreachable',
    timestamp: 'September 24, 2012 23:48',
    timeAgo: '30 minutes ago'
  }]
};

data.staging = {
  id: 2,
  name: "Staging",
  version: "2.5",
  tests: [{
    name: 'Test 5',
    id: 5,
    status: 'pass',
    timestamp: 'September 24, 2012 23:48',
    timeAgo: '30 minutes ago'
  }, {
    name: 'Test 6',
    id: 6,
    reason: 'Host unreachable',
    status: 'fail',
    timestamp: 'September 24, 2012 23:48',
    timeAgo: '30 minutes ago'
  }, {
    name: 'Test 7',
    id: 7,
    status: 'fail',
    reason: 'Host unreachable',
    timestamp: 'September 24, 2012 23:48',
    timeAgo: '30 minutes ago'
  }]
};

data.development = {
  id: 1,
  name: "Development",
  version: "2.5",
  tests: [{
    name: 'Test 8',
    id: 8,
    status: 'pass',
    reason: 'Host unreachable',
    timestamp: 'September 24, 2012 23:48',
    timeAgo: '30 minutes ago'
  }]
}

// GET
exports.tests = function(req, res) {
    var environment = req.params.environment;
    res.json(data[environment])
  };

exports.test = function(req, res) {
  var id = req.params.id;
  _.each(data, function(env){
    _.each(env.tests,function(test){
      if(test.id == id){
        res.json(test);
      }
    });
  });
};

exports.environment = function(req, res) {
  var id = req.params.id;
  _.each(data, function(env){
      if(env.id == id){
        res.json(env);
      }
  });
};

// POST
exports.addPost = function(req, res) {
  data.posts.push(req.body);
  res.json(req.body);
};

// PUT
exports.editPost = function(req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.posts.length) {
    data.posts[id] = req.body;
    res.json(true);
  } else {
    res.json(false);
  }
};

// DELETE
exports.deletePost = function(req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.posts.length) {
    data.posts.splice(id, 1);
    res.json(true);
  } else {
    res.json(false);
  }
};