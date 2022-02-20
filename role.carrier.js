let roleCarrier = {

    /** @param {Creep} creep **/
    run: function(creep) {

        let pickup_targets = creep.room.find(FIND_TOMBSTONES)
        pickup_targets + creep.room.find(FIND_DROPPED_RESOURCES)
        
        let transfer_targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_EXTENSION ||
                    structure.structureType === STRUCTURE_SPAWN ||
                    structure.structureType === STRUCTURE_TOWER ||
                    structure.structureType === STRUCTURE_CONTAINER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            }
        })
        
        if (pickup_targets.length > 0 && !creep.memory.transfering) {
            let pickup_target = pickup_targets[0]
            if (creep.pickup(pickup_target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(pickup_target, {visualizePathStyle: {stroke: '#ffffff'}})
            }
            if (!creep.store.getFreeCapacity()) {
                creep.moveTo(transfer_targets[0], {visualizePathStyle: {stroke: '#ffffff'}})
                creep.memory.transfering = true
            }
        }
        if (transfer_targets.length > 0 && creep.memory.transfering) {
            let transfer_target = transfer_targets[0]
            if (creep.transfer(transfer_target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(transfer_targets, {visualizePathStyle: {stroke: '#ffffff'}})
            }
            if (creep.store.getFreeCapacity() > creep.store.getCapacity() / 2) {
                creep.moveTo(pickup_targets[0], {visualizePathStyle: {stroke: '#ffffff'}})
                creep.memory.transfering = false
            }
        }
    }    
}

module.exports = roleCarrier
