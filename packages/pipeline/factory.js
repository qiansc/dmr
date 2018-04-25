/*
 * @Author: qiansc 
 * @Date: 2018-04-10 17:02:27 
 * @Last Modified by: qiansc
 * @Last Modified time: 2018-04-25 21:21:17
 */
var EventEmitter = require('events');
var Log = require('../util/log');
var env = require('../core/env');
var Config = require('../core/config.js');
var LineTransform = require('../pipeline/transform-line')
var MiddlewareTransform = require('../pipeline/transform-middleware');
var TableTransform = require('../pipeline/transform-table');
var JoinTransform = require('../pipeline/transform-join');
var zlib = require("zlib");

var log = new Log(5);
class Factory {
    static create(key, option){
        var config = Config.get('pipeline', key);
        config = Object.assign(config , option);
        if (!config) {
            throw new Error('Can not find config of pipeline: '+ key);
        }
        switch(config.module){
            case "transform-line":
                return new LineTransform(config);
                break;
            case "transform-middleware":
                return new MiddlewareTransform(config);
                break;
            case "transform-table":
                if (config.action == "format") {
                    return new TableTransform.Formater(config);
                } else if(config.action == "parser"){
                    return new TableTransform.Parser(config);
                }
                break;
            case "transform-join":
                return new JoinTransform(config);
                break;
            case "zlib":
                if (config.action == "gunzip") {
                    return zlib.createGunzip();
                } else {
                    throw new Error('Undefined method!');
                }
                break;
            default:
                throw new Error('Can not create pipeline: ' + key + " / " + config.module);
                break;
        }
    }
}

var cache = {};
function getCache (Target, key, config){
    var rs = cache[key] || new Target(config);
    cache[key] = rs;
    return rs;
}
module.exports = Factory;