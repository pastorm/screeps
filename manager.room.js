let memorySettings = require("memorySettings");
let populationManager = require('manager.population');
let roleManager = require('manager.roles');

let roomManager = {
    tick: function(room) {
        // console.log("room tick: "+room.name)

        memorySettings.tick(room)
        populationManager.run()
        roleManager.run(room)
    }
};

module.exports = roomManager;