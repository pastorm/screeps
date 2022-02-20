var memorySettings = {
    run: function () {
        // Suppression de la mémoire des screeps defunts
        for(var i in Memory.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }
        
        Memory.sources = {
            source1: {
                id: "26f20772347f879",
                max_harvester_slots: 4
            },
            source2: {
                id: "71ac0772347ffe6",
                max_harvester_slots: 5
            },
        }
    }
}

module.exports = memorySettings
