/*
 * @Author: qiansc 
 * @Date: 2018-05-18 11:04:29 
 * @Last Modified by: qiansc
 * @Last Modified time: 2018-05-19 11:22:20
 */
const Middleware = require('../middleware');
const MiddleWareFactory =  require('../factory');

class Pair extends Middleware {
    constructor (config) {
        super(config);
    }
    handle (part, togather) {
        if (this.deal  === undefined) {
            console.error("handle or pick method needs to be implemented!");
        } else {
            let result = this.deal(part);
            togather(result);
        }
    }
}

module.exports = Pair;