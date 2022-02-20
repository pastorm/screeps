const roleHarvester = require('role.harvester')
const roleCarrier = require('role.carrier')
const roleBuilder = require('role.builder')
const roleUpgrader = require('role.upgrader')

let roleManager = {
    run: function(room) {
        owned_creeps = room.find(FIND_MY_CREEPS)

        for(let name in owned_creeps) {
        
            let creep = owned_creeps[name]
            if (creep.memory.role === roleHarvester.label) {
                roleHarvester.run(creep)
            } 
            else if (creep.memory.role === roleCarrier.label) {
                roleCarrier.run(creep)
                continue
            } 
            else if (creep.memory.role === roleUpgrader.label) {
                roleUpgrader.run(creep)
                continue
            } 
            else if (creep.memory.role === roleBuilder.label) {
                roleBuilder.run(creep)
                continue
            }
        }      
    }
}

module.exports = roleManager
