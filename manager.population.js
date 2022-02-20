const roleHarvester = require('role.harvester')
const roleCarrier = require('role.carrier')
const roleBuilder = require('role.builder')
const roleUpgrader = require('role.upgrader')

let populationManager = {
    populations: {
        harvester: {
            role: roleHarvester,
            number: 1,
        },
        carrier: {
            role: roleCarrier,
            number: 1,
        },
        builder: {
            role: roleBuilder,
            number: 4,
        },
        upgrader: {
            role: roleUpgrader,
            number: 1,
        },
    },
    
    /** @param {Room} room **/
    run: function(room) {
        for (kind in this.populations) {
            nbKind = _.filter(Game.creeps, (creep) => {return creep.memory.role === kind}).length
            if (nbKind < this.populations[kind]) {
                this.spawnCreepOfKind(room, kind)
            }
        }
    },

    spawnCreepOfKind: function(room, kind) {
        const role = this.populations[kind].role
        Game.spawns[0].spawnCreep(
            role.getCreepBodyPartsToSpawn(room),
            kind + "-" + Game.time,
            {memory: {role: role.label}}
        )
    }
}

module.exports = populationManager