define(function(require, exports, module) {
    var $ = require('jquery');
    var Mustache = require('mustache');
    var Translator = require('./lib/Translator');
    var Heroes = require('./lib/collections/Heroes');
    // var Items = require('./lib/collections/Items');
    // var Abilities = require('./lib/collections/Abilities');
    var config = require('./config');
    
    print(JSON.stringify(Heroes.collection[0].getAttackDamage(15)),
          Heroes.collection[0].getArmorPhysical(15),
          Heroes.collection[0].getHealthBase(15),
          Heroes.collection[0].getManaBase(15),
          Heroes.collection[0].getAttackSpeed(15));
    
    return;
    require(['text!./bin/templates/joinDota/test.mustache'], function(html) {
        var view = {
            heroes: Heroes.collection,
            image: $.noop,
            name: function() {
                return Translator(this.key);
            },
            attribute: function() {
                return Translator(this.attributes.primary);
            },
            role: function() {
                return $.map(this.roles.role, function(value) {
                    return Translator(value);
                }).join(', ');
            },
        };
        var out = Mustache.render(html, view);
        print(out);
    });
});