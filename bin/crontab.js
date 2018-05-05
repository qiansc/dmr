var Log = require('../packages/util/log');
var log = new Log(2);

var program = require('commander');
var Config = require('../packages/core/config.js');

program
  .version('0.1.0', '-v, --version')
  .command('start [value]', 'Start Schedules');
//   .option('-s, --start [value]', 'Start Schedules', true)
//   .option('-p, --stop [value]', 'Stop Schedules', true)
//   .option('-r, --restart [value]', 'Restart Schedules', true)
//   .option('-l, --list [value]', 'List Schedules in Config', true);;


program.on('--help', function(){
    log.info('');
    log.info('  Examples:');
    log.info('');
    log.info('    $ crontab --start');
    log.info('    $ crontab --stop');
    log.info('    $ crontab --restart');
    log.info('');
});

program.parse(process.argv);

console.log(program.start);