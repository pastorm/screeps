let roleBuilder = {
    label: "builder",

    /** @param {Room} room **/
    getCreepBodyPartsToSpawn: function (room) {
        return [WORK, CARRY, MOVE]
    },

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.building = false
            creep.say('🔄 harvest')
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
            creep.memory.building = true
            creep.say('🚧 build')
        }

        if(creep.memory.building) {
            let targets = creep.room.find(FIND_CONSTRUCTION_SITES)
            if (targets.length) {
                if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}})
                }
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

module.exports = roleBuilder