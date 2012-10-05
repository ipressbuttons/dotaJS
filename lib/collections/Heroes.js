define(function(require) {
    var $ = require('jquery');
    var Collector = require('./Collector');
    var Hero = require('../entities/Hero');
    var config = require('dotaJS/config');
    
    var heroes = {};
    var activelist = [];
    require([config.files.data.heroes, config.files.data.activelist], function(data, data2) {
        heroes = data.DOTAHeroes;
        $.each(data2.whitelist, function(key, active) {
            if (active === '1') activelist.push(key);
        });
    });

    var Heroes = function() {
        var base = new Hero('npc_dota_hero_base', heroes.npc_dota_hero_base);
        Collector.call(this, heroes, base);
    };

    Heroes.prototype = Object.create(Collector.prototype);

    $.extend(true, Heroes.prototype, {
        constructor: Heroes,
        getHeroByUrl: function(url) {
            return this.collection.filter(function(element) {
                return element.url.toLowerCase() === url.toLowerCase();
            }).shift();
        },
        skiplist: ['Version', 'npc_dota_hero_base'],
        whitelist: activelist
    });
    
    return new Heroes();
});