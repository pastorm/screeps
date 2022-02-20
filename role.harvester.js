let roleHarvester = {
    label: "harvester",

    /** @param {Room} room **/
    getCreepBodyPartsToSpawn: function (room) {
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
            let sources = creep.room.find(FIND_SOURCES)
            if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}})
            }
        }
        else {
            creep.drop(RESOURCE_ENERGY)
        }
    }
}

module.exports = roleHarvester
