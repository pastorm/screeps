let memorySettings = {
    tick: function (room) {
        // Suppression de la mémoire des screeps defunts
        for(let i in Memory.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.creeps[i]
            }
        }

        let memory = room.memory
        if (memory.sources === undefined) {
            this.initMemory(room, memory)
        }
    },
    initMemory: function(room, memory) {

        memory.sources = {}

        let sources = room.find(FIND_SOURCES)

        for (let sourceIndex in sources) {
            let source = sources[sourceIndex]
            memory.sources[source.id] = source
        }

        console.log("Init memory for room "+room.name+" with " + JSON.stringify(memory))
    }
}

module.exports = memorySettings
