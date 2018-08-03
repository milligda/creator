// ==============================================================================
// Required files
// ==============================================================================

var orm = require('../config/orm.js');

// ==============================================================================
// world Object
// ==============================================================================

var world = {

    getAll: function(cb) {
        orm.getAll('worlds', function(res) {
            cb(res);
        });
    },

    addWorld: function(cb) {
        var newWorld = this.createWorld();

        console.log(newWorld);

        orm.add('worlds', newWorld, function(res) {
            cb(res);
        });
    },

    // deleteWorld: function(cb) {
        
    // },

    classifications: [
        'star',
        'gaseous',
        'icy',
        'terrestrial',
        'oceanic',
        'rocky'
    ],

    createWorld: function() {

        var name = '';
        var worldType = '';
        var classification = '';
        var life = false;
        var intelligentLife = false;
        var imageSlug = '';

        // randomly determine the world type and classification
        var randomType = Math.floor(Math.random() * this.classifications.length);

        // randomly determine if the planet has life
        var randomLife = Math.floor(Math.random() * 100) + 1;

        // randomly determine the number for the world image (between 1 and 2)
        var randomImage = Math.floor(Math.random() * 2) + 1;

        // randomly determine the number for the planet name
        var randomName = Math.floor(Math.random() *  10000) + 1;

        if (randomType === 0) {
            worldType = 'star';
        } else {
            worldType = 'planet';
        }

        classification = this.classifications[randomType];

        name = classification + '_' + randomName;

        if ((classification === 'terrestrial' || classification === 'oceanic') && (randomLife > 60)) {
            life = true;
        } 

        if ((classification === 'terrestrial' || classification === 'oceanic') && (randomLife > 90)) {
            intelligentLife = true;
        }

        imageSlug = classification + randomImage;

        var newWorld = {
            world_name: name,
            world_type: worldType,
            classification: classification,
            life: life,
            intelligent_life: intelligentLife,
            image_slug: imageSlug
        }

        return newWorld;
    }
}

// export the world object
module.exports = world;