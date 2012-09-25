var _ = require('underscore');
var mysql = require('mysql');



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
  var connection = mysql.createConnection({
    multipleStatements: true,
    host: '127.0.0.1',
    port: '3304',
    database: 'dbRio_02',
    user: 'rio',
    password: 'rio'
  });
  var environment = req.params.environment;
  var environmentSql = "select * from tbDashboardEnvironment where name = '" + environment+"'";
  var testSql = "select test.pkTestId as id, test.name, test.description, env.name as environment, test.repeatEvery, test.firstSeen, test.lastSeen, test.threshold, status.status, status.reason, max(status.timestamp) as timestamp from tbDashboardTest test inner join tbDashboardStatus status on test.pkTestId = status.fkTestId inner join tbDashboardEnvironment env on test.fkEnvId = env.pkEnvId where env.name = '" + environment + "' group by test.pkTestId";
  connection.connect();
  connection.query(environmentSql + ";"+ testSql, function(err, rows, fields) {
    var tests = rows[1] || [];
    if (err) throw err;
    if (rows.length > 0) {
      console.log('--------    Environment       --------------');
      console.log(rows[0]);
      console.log('--------    Tests       --------------');
      console.log(rows[1]);
      console.log('--------------------------------------');
      var env = {
        name: rows[0][0].name,
        id: rows[0][0].pkEnvId,
        version: rows[0][0].version,
        tests: tests
      }
    } 
    res.json(env);
  });
  connection.end();
};

exports.test = function(req, res) {
  var id = req.params.id;
  var sql = "select test.pkTestId as id, test.name, test.description, env.name as environment, test.repeatEvery, test.firstSeen, test.lastSeen, test.threshold, status.status, status.reason, status.timestamp from tbDashboardTest test inner join tbDashboardStatus status on test.pkTestId = status.fkTestId and status.timestamp = (select max(timestamp) from tbDashboardStatus where fkTestId = " + id + ") inner join tbDashboardEnvironment env on test.fkEnvId = env.pkEnvId";
  _.each(data, function(env) {
    _.each(env.tests, function(test) {
      if (test.id == id) {
        res.json(test);
      }
    });
  });
};

exports.environment = function(req, res) {
  var id = req.params.id;
  _.each(data, function(env) {
    if (env.id == id) {
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