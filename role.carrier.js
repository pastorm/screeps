const bodyParts = require("./constants.bodyParts");
let roleCarrier = {
    label: "carrier",

    /**
     *
     * @param {Room} room
     * @param maxEnergy
     * @returns {("work"|"carry"|"move")[]}
     */
    getCreepBodyPartsToSpawn: function (room, energy) {
        const baseParts = [CARRY, MOVE]
        const additionalParts = [CARRY, MOVE]
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
        
        let pickup_targets = creep.room.find(FIND_DROPPED_RESOURCES)
        // pickup_targets + creep.room.find(FIND_TOMBSTONES)
        
        let transfer_targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_EXTENSION ||
                    structure.structureType === STRUCTURE_SPAWN ||
                    structure.structureType === STRUCTURE_TOWER ||
                    structure.structureType === STRUCTURE_CONTAINER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            }
        })
        
        let pickup_target = pickup_targets.length ? pickup_targets[0] : null
        let transfer_target = transfer_targets.length ? transfer_targets[0] : null
        
        if (pickup_targets.length > 0 && !creep.memory.transfering) {
            if (creep.pickup(pickup_target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(pickup_target, {visualizePathStyle: {stroke: '#ffffff'}})
            }
            if (!creep.store.getFreeCapacity()) {
                creep.moveTo(transfer_targets[0], {visualizePathStyle: {stroke: '#ffffff'}})
                creep.memory.transfering = true
            }
        }
        if (transfer_targets.length > 0 && creep.memory.transfering) {

            if (creep.transfer(transfer_target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(transfer_target, {visualizePathStyle: {stroke: '#ffffff'}})
            }
            if (creep.store.getFreeCapacity() > creep.store.getCapacity() / 2) {
                creep.moveTo(pickup_targets[0], {visualizePathStyle: {stroke: '#ffffff'}})
                creep.memory.transfering = false
            }
        }
    }    
}

module.exports = roleCarrier
