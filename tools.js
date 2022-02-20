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

/** @param {RoomPosition} roomPosition **/
var findClosestSource = function(roomPosition) {
    let room = Game.rooms[roomPosition.roomName]
    let memory = room.memory
    let sources = memory.sources

    // Filtre des sources avec de la place
    sources = sources.filter((source) => source.freeSlotCount > 0)

    if (sources.length === 0)
        return undefined

    // Choix de la source la plus proche
    let closest = roomPosition.findClosestByPath(sources)

    return closest
}

module.exports = {
    gatherEnergy: gatherEnergy,
    findClosestSource: findClosestSource
}
