var Log = require('../packages/util/log');
var log = new Log(2);
Log.setGlobalLev(5);

var stream = require('stream');
var util = require('util');

var env = require('../packages/core/env');
console.log(env.task["search-ac"]);
// console.log(env);
// var schedule = require('node-schedule');
 
// var j = schedule.scheduleJob('*/2 * * * *', function(){
//   console.log('The answer to life, the universe, and everything!');
// });