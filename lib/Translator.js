define(function(require, exports, module) {
    var $ = require('jquery');
    var config = require('../config');
    
    var Translator = function(language) {
        this.setLanguage(language);
    };
    
    
    $.extend(true, Translator.prototype, {
        language: config.language,
        translations: {},
        get: function(key) {
            var T = this;
            var ret = function() {
                var translation = T.translations[T.language];
                if (translation.hasOwnProperty(key))
                    return translation[key];
                else if (translation.hasOwnProperty('[english]' + key))
                    return translation['[english]' + key];
                else
                    return 'Missing translation';
            };
            ret.toString = function() {
                return this();
            };
            return ret;
        },
        setLanguage: function(language) {
            this.language = language;
            var translation = {};
            require([config.resources.translations[language]], function(file) {
                translation = file.lang.Tokens;
            });
            this.translations[language] = translation;
        }
    });
    var T = new Translator(config.language);
    return T;
});