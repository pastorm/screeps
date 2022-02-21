/** @param {Creep} creep **/
let gatherEnergy = function (creep) {
    // TODO s'approvisionner dans les structures/containers mais pas dans les mines
    let containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => { return structure.structureType === STRUCTURE_CONTAINER }
        })
    
    if (containers.length) {
        let not_empty_containers = _.filter(containers, (container) => container.store.getUsedCapacity(RESOURCE_ENERGY))
        let closest = creep.pos.findClosestByPath(not_empty_containers)
        
        console.log(not_empty_containers.length)

        if (creep.withdraw(closest, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(closest, {visualizePathStyle: {stroke: '#ffffff'}})
        }

    } else {
        let backup_targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                    structure.structureType === STRUCTURE_EXTENSION
                    || structure.structureType === STRUCTURE_SPAWN
                ) 
                && structure.store.getUsedCapacity(RESOURCE_ENERGY)
            }
        })
        let closest = creep.pos.findClosestByPath(backup_targets)

        if (creep.withdraw(closest, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(closest, {visualizePathStyle: {stroke: '#ffffff'}})
        }
    }
}

/** @param {Creep} creep **/
var findClosestSource = function(creep) {
    let room = creep.room
    let memory = room.memory
    let memorySources = memory.sources

    if (memorySources.length === 0) {
        return undefined
    }
    
    // On chope les sources
    let allSources = memorySources.map((source) => source.source)
    
    // Choix de la source la plus proche
    let closest = creep.pos.findClosestByPath(allSources)
    if (closest && closest.pos.isNearTo(creep)) {
        return closest
    } else {
        // Filtre des sources avec de la place
        let available_sources = memorySources.filter((source) => source.freeSlotCount > 0).map((source) => source.source)
        return creep.pos.findClosestByPath(available_sources)
    }
}

module.exports = {
    gatherEnergy: gatherEnergy,
    findClosestSource: findClosestSource
}
