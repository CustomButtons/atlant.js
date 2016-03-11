"use strict";

var s = require('../lib');

var Log = function Log(){
    var on = false;
    var atlantPrefix = 'Atlant.js: ';

    Object.defineProperty(this, 'verbose', { 
        get: _ => on 
        ,set: _ => { on = _; return on }
    });
    
    this.log = function(...args) {
        if (!on) return;
        
        console.log(atlantPrefix, ...args)
    }

    this.warn = function(...args) {
        if (!on) return;
        
        console.warn(atlantPrefix, ...args)
    }

    this.time = function(name) {
        if (!on) return;
        if (console.time) {
            return console.time(atlantPrefix + name)
        }
    } 

    this.timeEnd = function(name) {
        if (!on) return;
        if (console.timeEnd) {
            return console.timeEnd(atlantPrefix + name)
        }
    }
    return this;
}

var instance;
module.exports = function() {
    if(instance) return instance;
    instance = new Log();
    return instance;
}