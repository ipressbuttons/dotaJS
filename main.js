define(function(require, exports, module) {
    var $ = require('jquery');
    var Mustache = require('mustache');
    var t = require('./lib/Translator');
    var Heroes = require('./lib/collections/Heroes');
    //var Items = require('./lib/collections/Items');
    var Abilities = require('./lib/collections/Abilities');
    
    console.log(Abilities.collection[2].getDescription());
    
    return;

    require(['text!./bin/templates/default/heroes.mustache'], function(html) {
        var view = {
            heroes: Heroes.getHeroByUrl('Anti-Mage'),
            image: $.noop,
            name: function() {
                return t(this.key);
            },
            attribute: function() {
                return t(this.attributes.primary);
            },
            role: function() {
                return $.map(this.roles.role, function(value) {
                    return t(value);
                }).join(', ');
            },
        };
        var out = Mustache.render(html, view);
        console.log(out);
    });
});