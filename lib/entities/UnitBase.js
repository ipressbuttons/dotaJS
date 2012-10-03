define(function(require) {
    var $ = require('jquery');
    var Base = require('./Base');

    var UnitBase = function(key, data) {
        Base.apply(this, arguments);
    };

    UnitBase.prototype = Object.create(Base.prototype);
    
    $.extend(true, UnitBase.prototype, {
        constructor: UnitBase,
        
        getAttribute: function(attribute, level) {
            if (!level) level = 1;
            return attribute.base + ((level - 1) * attribute.gain);
        },
        
        getArmorPhysical: function(level) {
            return this.armor.physical + 0.14 * this.getAttribute(this.attributes.agility, level);
        },

        getHealthBase: function(level) {
            return this.health.base + 19 * this.getAttribute(this.attributes.strength, level);
        },
        
        getHealthRegen: function(level) {
            return this.health.regen + 0.03 * this.getAttrbute(this.attributes.strength, level);
        },
        
        getManaBase: function(level) {
            return this.mana.base + 13 * this.getAttribute(this.attributes.intelligence, level);
        },
        
        getManaRegen: function(level) {
            return this.mana.regen + 0.04 * this.getAttrbute(this.attributes.intelligence, level);
        },
        
        getAttackDamage: function(level) {
            var attribute;
            switch(this.attributes.primary) {
                case 'DOTA_ATTRIBUTE_AGILITY':
                    attribute = this.getAttribute(this.attributes.agility, level);
                    break;
                case 'DOTA_ATTRIBUTE_INTELLECT':
                    attribute = this.getAttribute(this.attributes.intelligence, level);
                    break;
                case 'DOTA_ATTRIBUTE_STRENGTH':
                    attribute = this.getAttribute(this.attributes.strength, level);
                    break;
                default:
                    throw new Error("Can not determine primary attribute");
                return;
            }
            return {
                min: this.attack.damage.min + attribute,
                max: this.attack.damage.max + attribute,
            };
        },
        
        // In 1/s
        getAttackSpeed: function(level) {
            return (1 + (this.getAttribute(this.attributes.agility, level)/100))/this.attack.rate;
        },
        
        team: '',
        abilities: [],
        armor: {
            physical: 0,
            magical: 0,
        },
        attack: {
            capabilities: '',
            damage: {
                min: 0,
                max: 0,
                type: '',
            },
            rate: 0,
            animation: 0,
            range: 0,
            projectile: 0,
        },
        attributes: {
            primary: '',
            strength: {
                base: 0,
                gain: 0,
            },
            intelligence: {
                base: 0,
                gain: 0,
            },
            agility: {
                base: 0,
                gain: 0,
            },
        },
        bounty: {
            xp: 0,
            gold: {
                min: 0,
                max: 0,
            },
        },
        movement: {
            capabilities: '',
            speed: 0,
            turnrate: 0,
        },
        health: {
            base: 0,
            regen: 0,
        },
        mana: {
            base: 0,
            regen: 0,
        },
        vision: {
            day: 0,
            night: 0,
        },

        _super: Base,
        _propertyMap: {
            armor: {
                physical: {
                    property: 'ArmorPhysical',
                    callback: parseInt
                },
                magical: {
                    property: 'ArmorMagical',
                    callback: parseInt
                }
            },
            abilities: {
                multiKey: true,
                properties: ['Ability1', 'Ability2', 'Ability3', 'Ability4',
                             'Ability5', 'Ability6', 'Ability7', 'Ability8']
            },
            attack: {
                capabilities: 'AttackCapabilities',
                damage: {
                    min: {
                        property: 'AttackDamageMin',
                        callback: parseInt
                    },
                    max: {
                        property: 'AttackDamageMax',
                        callback: parseInt
                    },
                    type: 'AttackDamageType',
                },
                rate: {
                    property: 'AttackRate',
                    callback: parseFloat,
                },
                animation: {
                    property: 'AttackAnimationPoint',
                    callback: parseFloat
                },
                range: {
                    property: 'AttackRange',
                    callback: parseInt
                },
                projectile: {
                    property: 'ProjectileSpeed',
                    callback: parseInt
                }
            },
            attributes: {
                primary: 'AttributePrimary',
                strength: {
                    base: {
                        property: 'AttributeBaseStrength',
                        callback: parseInt
                    },
                    gain: {
                        property: 'AttributeStrengthGain',
                        callback: parseFloat
                    }
                },
                intelligence: {
                    base: {
                        property: 'AttributeBaseIntelligence',
                        callback: parseInt
                    },
                    gain: {
                        property: 'AttributeIntelligenceGain',
                        callback: parseFloat
                    }
                },
                agility: {
                    base: {
                        property: 'AttributeBaseAgility',
                        callback: parseInt
                    },
                    gain: {
                        property: 'AttributeAgilityGain',
                        callback: parseFloat
                    }
                },
            },
            bounty: {
                xp: 'BountyXP',
                gold: {
                    min: {
                        property: 'BountyGoldMin',
                        callback: parseInt
                    },
                    max: {
                        property: 'BountyGoldMax',
                        callback: parseInt
                    }
                },
            },
            movement: {
                capabilities: 'MovementCapabilities',
                speed: {
                    property: 'MovementSpeed',
                    callback: parseInt
                },
                turnrate: {
                    property: 'MovementTurnRate',
                    callback: parseFloat
                }
            },
            health: {
                base: {
                    property: 'StatusHealth',
                    callback: parseInt
                },
                regen: {
                    property: 'StatusHealthRegen',
                    callback: parseFloat
                }
            },
            mana: {
                base: {
                    property: 'StatusMana',
                    callback: parseInt
                },
                regen: {
                    property: 'StatusManaRegen',
                    callback: parseFloat
                }
            },
            vision: {
                day: {
                    property: 'VisionDaytimeRange',
                    callback: parseInt
                },
                night: {
                    property: 'VisionNighttimeRange',
                    callback: parseInt
                }
            }
        }
    });
    return UnitBase;
});