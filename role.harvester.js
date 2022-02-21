const tools = require("tools")

let roleHarvester = {
    label: "harvester",

    /** @param {Room} room **/
    getCreepBodyPartsToSpawn: function (room) {
        // TODO harvester simple s il n y en a pas
        // TODO carrier simple s'il n'y en a pas
        let bodyParts = [WORK, CARRY, MOVE]
        let maxCapacity = room.energyCapacityAvailable - 200
        let nextPart = WORK // nextPart est toujours WORK ^^
        while (maxCapacity >= 0) {
            if (maxCapacity - 100 >= 0) {
                bodyParts.push(nextPart)
                maxCapacity -= 100
            } else {
                break
            }
        }
        return bodyParts
    },

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.harvesting == true) {
            creep.harvest(Game.getObjectById(creep.memory.source_id))
        } else {
            let source = tools.findClosestSource(creep.pos)
            if (creep.harvest(source) === OK) {
                creep.memory.harvesting = true
                creep.memory.source_id = source.id
            } else {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}})
            }
        }        
        
        if (creep.store.getFreeCapacity() === 0) {
            creep.drop(RESOURCE_ENERGY)
        }
    }
}

module.exports = roleHarvester
