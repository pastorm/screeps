const tools = require("tools")
const bodyParts = require("constants.bodyParts")
const {add} = require("lodash");

let roleHarvester = {
    label: "harvester",

    /**
     *
     * @param {Room} room
     * @param energy
     * @returns {("work"|"carry"|"move")[]}
     */
    getCreepBodyPartsToSpawn: function (room, energy) {

        const baseParts = [WORK, CARRY, MOVE]
        const additionalParts = [WORK, WORK, CARRY]
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
        if (creep.memory.harvesting == true) {
            creep.harvest(Game.getObjectById(creep.memory.source_id))
        } else {
            let source = tools.findClosestSource(creep)
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
