let memoryManager = require("manager.memory")
let populationManager = require('manager.population')
let roleManager = require('manager.roles')
let towerManager = require('manager.towers')

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