let populationManager = {
    populations: {
        harvester: { nb: 1, skills: [WORK, CARRY, MOVE] },
        builder: { nb: 1, skills: [WORK, WORK, CARRY, MOVE, MOVE] },
        upgrader: { nb: 1, skills: [WORK, WORK, CARRY, MOVE, MOVE] },
    },
    run: function() {
        for (kind in this.populations) {
            nbKind = _.filter(Game.creeps, (creep) => {return creep.memory.role === kind}).length
            if (nbKind < this.populations[kind][nb]) {
                Game.spawns["Spawn1"].spawnCreep(this.populations[kind][skills], kind + "-" + Game.time, {memory: {role: kind}})
            }
        }
    }
}

module.exports = populationManager
