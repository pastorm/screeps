const tools = require("tools")

let roleUpgrader = {
    label: "upgrader",

    /** @param {Room} room **/
    getCreepBodyPartsToSpawn: function (room) {
        return [WORK, CARRY, MOVE]
    },

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.upgrading = false
            creep.say('🔄 harvest')
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
            creep.memory.upgrading = true
            creep.say('⚡ upgrade')
        }

        if (creep.memory.upgrading) {
            let repair_targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            })
            repair_targets.sort((a,b) => a.hits - b.hits)
            
            if (repair_targets.length > 0) {
                if(creep.repair(repair_targets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(repair_targets[0])
                }
            }
            else if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}})
            }
        }
        else {
            let source = tools.findClosestSource(creep.pos)
            if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}})
            }
        }
    }
}

module.exports = roleUpgrader