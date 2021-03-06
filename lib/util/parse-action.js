/*
 * @Author: qiansc 
 * @Date: 2018-04-17 20:51:54 
 * @Last Modified by: qiansc
 * @Last Modified time: 2018-05-06 19:06:08
 */
 var Log = require('../util/log');
 var ActionLog = require('../core/action-log');
 var Action = require('../core/action');
 var log = new Log(2);

 module.exports = function(key){
     var rs = ActionLog.getLogByKey(key);
     if(rs && rs.action){
        log.info('Use Key\t'+rs.id+'-'+ key +'');
        return new Action(rs.action);
     }
     return false;
 }