const tools = require("tools")
const bodyParts = require("./constants.bodyParts");

let roleBuilder = {
    label: "builder",

    /**
     *
     * @param {Room} room
     * @param maxEnergy
     * @returns {("work"|"carry"|"move")[]}
     */
    getCreepBodyPartsToSpawn: function (room, energy) {
        const baseParts = [WORK, CARRY, MOVE]
        const additionalParts = [CARRY, MOVE, WORK, CARRY, MOVE]
        let parts = []

        for (let i in baseParts) {
            let part = baseParts[i]
            energy -= bodyParts[part]
            parts.push(part)
        }

        while (energy > 0) {
            let any = false
            for (let i in additionalParts) {
                let part = additionalParts[i]

                if (energy >= bodyParts[part]) {
                    energy -= bodyParts[part]
                    parts.push(part)
                    any = true
                }
            }

            if (!any)
                break

        }
        return parts
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
            let source = tools.findClosestSource(creep)
            if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}})
            }
        }
    }
}

module.exports = roleBuilder