const roleHarvester = require('role.harvester')
const roleCarrier = require('role.carrier')
const roleBuilder = require('role.builder')
const roleUpgrader = require('role.upgrader')

let populationManager = {
    populations: [
        {
            role: roleHarvester,
            maxNumber: 2,
        },
        {
            role: roleCarrier,
            maxNumber: 2,
        },
        {
            role: roleBuilder,
            maxNumber: 1,
        },
        {
            role: roleUpgrader,
            maxNumber: 4,
        },
    ],
    
    /** @param {Room} room **/
    run: function(room) {
        for (i in this.populations) {
            let kind = this.populations[i]
            let nbKind = _.filter(room.find(FIND_MY_CREEPS), (creep) => {return creep.memory.role === kind.role.label}).length
            if (nbKind < kind.maxNumber) {
                this.spawnCreepOfKind(room, kind)
            }
        }
    },

    /** @param {Room} room **/
    spawnCreepOfKind: function(room, kind) {
        const role = kind.role
        let spawns = room.find(FIND_MY_SPAWNS)

        spawns[0].spawnCreep(
            role.getCreepBodyPartsToSpawn(room),
            role.label + "-" + Game.time,
            {memory: {role: role.label}}
        )
    }
}

module.exports = populationManager