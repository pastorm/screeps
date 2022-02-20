let memorySettings = require("memorySettings");
let populationManager = require('feature.populationManager');

let roomManager = {
    tick: function(room) {
        console.log("room tick: "+room.name)

        memorySettings.run()
        populationManager.run()
    }
};

module.exports = roomManager;