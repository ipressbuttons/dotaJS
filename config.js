define(function(require, exports, module) {
    var $ = require('jquery');
    var config = {
        language: "english",
        files: {
            stringmap: 'dotaJS/bin/stringmap',
            translations: {
                english: 'dotaJS/bin/translations/dota_english',
                german: 'dotaJS/bin/translations/dota_german',
            },
            data: {
                abilities: 'dotaJS/bin/data/npc_abilities',
                heroes: 'dotaJS/bin/data/npc_heroes',
                items: 'dotaJS/bin/data/items',
                units: 'dotaJS/bin/data/npc_units',
                activelist: 'dotaJS/bin/data/activelist',
            },
            images: {
                abilities: 'dotaJS/bin/images/spellicons/',
                heroes: {
                    selection: 'dotaJS/bin/images/heroes/selection/',
                    portraits: 'dotaJS/bin/images/heroes/',
                    minimap: 'dotaJS/bin/images/miniheroes/'
                },
                items: 'dotaJS/bin/images/items/',
            }
        }
    };
    $.extend(true, config, module.config());
    return config;
});