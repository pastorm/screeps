let memorySettings = {
    run: function () {
        // Suppression de la mémoire des screeps defunts
        for(let i in Memory.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }
        // if (Memory.sources === undefined) {
            this.initMemory()
        // }

        // console.log("Memory" + JSON.stringify(Memory.sources))
    },
    initMemory: function() {

        Memory.sources = {}

        for (let roomName in Game.rooms) {
            let room = Game.rooms[roomName]
            let sources = room.find(FIND_SOURCES)

            for (let sourceIndex in sources) {
                let source = sources[sourceIndex]
                console.log("source " + source)

            }
        }

            // source1: {
            //     id: "999",
            //     max_harvester_slots: 4
            // },
            // source2: {
            //     id: "777",
            //     max_harvester_slots: 5
            // },

        // for (let )
        // console.log("debug:" + JSON.stringify(Game.rooms))
    }
}

module.exports = memorySettings
