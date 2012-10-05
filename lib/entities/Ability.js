define(function(require) {
    var GLOBAL_PREFIX = 'DOTA_Tooltip_ability_';
    var DESCRIPTION_SUFFIX = '_Description';
    var LORE_SUFFIX = '_Lore';
    var VAR_TYPE = 'var_type';
    
    var $ = require('jquery');
    var Base = require('./Base');

    var Ability = function(key, data) {
        Base.apply(this, arguments);
    };

    Ability.prototype = Object.create(Base.prototype);

    $.extend(true, Ability.prototype, {
        getName: function() {
            return GLOBAL_PREFIX + this.key;
        },
        
        getDescription: function() {
            return this.getName() + DESCRIPTION_SUFFIX;
        },
        
        getLore: function() {
            return this.getName() + LORE_SUFFIX;
        },
        
        getSpecialText: function(special) {
            if (typeof special === 'number')
                special = this.special[special];
            
            var key = '';
            for (var s in special) {
                if (s !== VAR_TYPE) {
                    key = s;
                    break;
                }
            }
            
            return GLOBAL_PREFIX + this.key + '_' + key;
        },
        
        constructor: Ability,

        id: 0,
        name: '',
        type: '',
        behavior: [],
        castrange: [],
        channeltime: [],
        cooldown: [],
        duration: [],
        damage: [],
        manacost: [],
        special: [],

        _super: Base,
        _propertyMap: {
            id: 'ID',
            name: 'AbilityName',
            type: 'AbilityType',
            behavior: {
                property: 'AbilityBehavior',
                callback: function(s) {
                    return s.split(' | ');
                },
            },
            castrange: {
                property: 'AbilityCastRange',
                callback: function(s) {
                    return $.map(s.split(' '), function(value) {
                        return new Number(value);
                    });
                },
            },
            channeltime: {
                property: 'AbilityChannelTime',
                callback: function(s) {
                    return $.map(s.split(' '), function(value) {
                        return new Number(value);
                    });
                },
            },
            cooldown: {
                property: 'AbilityCooldown',
                callback: function(s) {
                    return $.map(s.split(' '), function(value) {
                        return new Number(value);
                    });
                },
            },
            duration: {
                property: 'AbilityDuration',
                callback: function(s) {
                    return $.map(s.split(' '), function(value) {
                        return new Number(value);
                    });
                },
            },
            damage: {
                property: 'AbilityDamage',
                callback: function(s) {
                    return $.map(s.split(' '), function(value) {
                        return new Number(value);
                    });
                },
            },
            manacost: {
                property: 'AbilityManaCost',
                callback: function(s) {
                    return $.map(s.split(' '), function(value) {
                        return new Number(value);
                    });
                },
            },
            special: {
                property: 'AbilitySpecial',
                callback: function(s) {
                    var result = [];
                    $.each(s, function(index, value) {
                        result[new Number(index) - 1] = value;
                    });
                    return result;
                }
            },
        },
    });
    return Ability;
});