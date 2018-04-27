/*
 * @Author: qiansc 
 * @Date: 2018-04-10 11:20:25 
 * @Last Modified by: qiansc
 * @Last Modified time: 2018-04-25 21:06:14
 */
var path = require('path');
var program = require('commander');
var Log = require('../packages/util/log');
var TaskFactory = require('../packages/task/factory');
var Action = require('../packages/core/action');
var parseRange = require('./util/parse-range');
var parseAction = require('./util/parse-action');

var log = new Log(2);

program
.version('0.1.0', '-v, --version')
.option('-t, --task <value>', 'Task ID')
.option('-k, --key <value>', 'Prev Action Key [option]')
.option('-s, --start <items>', 'Start Date / Datetime[option]')
.option('-e, --end <items>', 'End Date / Datetime[option]')
.option('-r, --range <value>', 'Ranges(d,h,m,s) [option]')
.option('-l, --log <value>', 'Log Output Level Since Less to All( 0 ~ 9 )')
.option('-p, --project <value>', 'Specify Project');

program.on('--help', function(){
  log.info('');
  log.info('  Examples:');
  log.info('');
  log.info('    $ super -t search_ac -k F9ELA/H8LNP');
  log.info('    $ super -t search_ac -s 20180401.1200.00 -r 10s');
  log.info('    $ super -t search_ac -s 20180401.1200.00 -e 20180401120010 -p speedup-ace');
  log.info('');
  log.info('  Supported Task:');
  log.info('');
  log.info('    search_ac      search_ac.log');
  log.info(' ');
});

program.parse(process.argv);

if (program.log !== undefined){
    Log.setGlobalLev(program.log);
}

var taskId = program.task || false;
var key = program.key || false;
var action = new Action();
/**
 *  参数选项验证
 */
var range = parseRange(program);

log.info('------------------------------------------------------------------------');
// log.group('    ');
log.info('You will start a calculate job with:\r\n');
if (taskId){
    log.info('Task', taskId);
}else {
    log.info('Task ID is required!');
}

if (key){
    // 从当前命令执行路径计算目标路径，会覆盖task默认file
    // file = path.resolve(process.cwd(), file);
    // action.set('file', file);
    // log.info('[file] ', file);
    action = parseAction(key);
} else if (range) {
    action.set('range', range.param());
} else {
    log.info('Key or RangeInfo is required!');
    return;
}

log.info('------------------------------------------------------------------------\r\n');

action.set('task-type', "calculate");
action.set('task-id', taskId);
var task = TaskFactory.create(action);
task.run();