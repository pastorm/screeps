let gatherEnergy = function (creep) {
    // TODO s'approvisionner dans les structures/containers mais pas dans les mines
    let targets = creep.room.find(FIND_STRUCTURES)

    for (source in sources) {
        source = sources[source]
        
    }
    
    if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}})
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
