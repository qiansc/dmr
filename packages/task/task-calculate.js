/*
 * @Author: qiansc 
 * @Date: 2018-04-10 11:11:29 
 * @Last Modified by: qiansc
 * @Last Modified time: 2018-04-25 21:08:21
 */
var fs  = require('fs');
var path = require('path');
var Log =require('../util/log');
var env = require('../core/env');
var Task = require('../task/task');
var File = require('../util/file');
var SourceFactory = require('../source/factory');
var PipelineFactory = require('../pipeline/factory');

var log = new Log(5);

class CalculateTask extends Task{
    constructor(action){
        super(action);
    }
    run () {
        var self = this,
        action =  this.action,
        config = this.action.config;
        // 默认输出writer为控制台
        var writer = process.stdout;

        var importSource = SourceFactory.create(config["input-source"]);
        importSource.set('range', action.range);
        importSource.set('file', action.file);
        importSource.on('create', function (file) {
            log.warn('L1', 'FROM\t' , file);
        });
        var reader = importSource.createReadStream();
        var rs = reader;
        var pipelineConfig = config["pipeline"] || [];
        // 获得管道配置
        pipelineConfig.forEach(
            (item) => {
                var pipeline = PipelineFactory.create(item);
                // 将rs输出定向到pipeline，并将pipeline赋值给rs，成为下个管道的输入
                rs = rs.pipe(pipeline);
            }
        );

        var oputSource = SourceFactory.create(config["output-source"]);
        oputSource.set('range', action.range);
        oputSource.set('file', action.file);
        oputSource.on('create', function (file) {
            log.warn('L1', 'TO\t' , file);
        });
        var writer = oputSource.createWriteStream();

        log.time('Calculate last for');
        rs.pipe(writer);
        writer.on('finish',function(chunk){
            log.timeEnd('Calculate last for');
        });
    }
    
}

module.exports = CalculateTask;