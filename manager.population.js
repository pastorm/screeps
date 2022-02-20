let populationManager = {
    populations: {
        harvester: 1,
        builder: 4,
        upgrader: 1,
    },
    run: function() {
        for (kind in this.populations) {
            nbKind = _.filter(Game.creeps, (creep) => {return creep.memory.role === kind}).length
            if (nbKind < this.populations[kind]) {
                Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], kind + "-" + Game.time, {memory: {role: kind}})
            }
        }
    }
}

module.exports = populationManager