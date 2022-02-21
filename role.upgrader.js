const tools = require("tools")
const bodyParts = require("./constants.bodyParts");

let roleUpgrader = {
    label: "upgrader",

    /**
     *
     * @param {Room} room
     * @param maxEnergy
     * @returns {("work"|"carry"|"move")[]}
     */
    getCreepBodyPartsToSpawn: function (room, energy) {
        const baseParts = [WORK, CARRY, MOVE]
        const additionalParts = [CARRY, MOVE, WORK]
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
            tools.gatherEnergy(creep)
        }
    }
}

module.exports = roleUpgrader