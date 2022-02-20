var gatherEnergy = function () {
    var sources = creep.room.find(FIND_SOURCES);
    
    for (source in sources) {
        source = sources[source]
        
    }
    
    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
    }
}

module.exports = {
    "gatherEnergy": gatherEnergy
};