let memorySettings = require("memorySettings")
let populationManager = require('manager.population')
let roleManager = require('manager.roles')
let towerManager = require('manager.towers')

let roomManager = {
    tick: function(room) {
        // console.log("room tick: "+room.name)

        memorySettings.tick(room)
        populationManager.run()
        roleManager.run(room)
        towerManager.tick(room)
        // if (riche) {
        // roadManager.tick(room)
        // }
    }
}

module.exports = roomManager
