roleHarvester = require('role.harvester')
roleBuilder = require('role.builder')
roleUpgrader = require('role.upgrader')

let roleManager = {
    run: function(room) {
        owned_creeps = room.find(FIND_MY_CREEPS)

        for(let name in owned_creeps) {
        
            let creep = owned_creeps[name]
            if(creep.memory.role === 'harvester') {
                roleHarvester.run(creep)
                break
            }
            if(creep.memory.role === 'harvester') {
                roleHarvester.run(creep)
            }
            if(creep.memory.role === 'upgrader') {
                roleUpgrader.run(creep)
            }
            if(creep.memory.role === 'builder') {
                roleBuilder.run(creep)
            }
        }      
    }
}

module.exports = roleManager
