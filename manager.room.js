const memorySettings = require("memorySettings")
const populationManager = require('manager.population')
const roleManager = require('manager.roles')
const towerManager = require('manager.towers')

let roomManager = {
    tick: function(room) {
        // console.log("room tick: " + room.name)

        memoryManager.tick(room)
        populationManager.run()
        roleManager.run(room)
        towerManager.tick(room)
        // if (riche) {
        // roadManager.tick(room)
        // }
    }
}

module.exports = roomManager