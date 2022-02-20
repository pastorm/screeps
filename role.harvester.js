const tools = require("tools")

let roleHarvester = {
    label: "harvester",

    /** @param {Room} room **/
    getCreepBodyPartsToSpawn: function (room) {
        // TODO harvester simple s il n y en a pas
        // TODO carrier simple s'il n'y en a pas
        let maxCapacity = room.energyCapacityAvailable
        let bodyParts = [WORK, CARRY, MOVE]
        let nextPart = WORK
        while (maxCapacity >= 0) {
            if (maxCapacity - 50 < 0) {
                bodyParts.push(nextPart)
            } else {
                break
            }
            // nextPart est toujours WORK ^^
        }

        return bodyParts
    },

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.store.getFreeCapacity() > 0) {
            let source = tools.findClosestSource(creep.pos)
            if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}})
            }
        }
        else {
            creep.drop(RESOURCE_ENERGY)
        }
    }
}

module.exports = roleHarvester
