const roleHarvester = require('role.harvester')
const roleCarrier = require('role.carrier')
const roleBuilder = require('role.builder')
const roleUpgrader = require('role.upgrader')

let populationManager = {
    populationRules: [
        {
            role: roleHarvester,
            maxNumber: 2,
            minNumber: 1,
        },
        {
            role: roleCarrier,
            maxNumber: 2,
            minNumber: 1,
        },
        {
            role: roleBuilder,
            maxNumber: 2,
            minNumber: 0,
        },
        {
            role: roleUpgrader,
            maxNumber: 4,
            minNumber: 0,
        },
    ],
    
    /** @param {Room} room **/
    run: function(room) {
        let populations = []

        for (let i in this.populationRules) {
            let ruleForKind = this.populationRules[i]
            let nbKind = _.filter(room.find(FIND_MY_CREEPS), (creep) => {return creep.memory.role === ruleForKind.role.label}).length

            populations.push({
                required: ruleForKind.minNumber >= nbKind ? ruleForKind.minNumber - nbKind : 0, // Required creeps for minNumber
                spaceLeft: ruleForKind.maxNumber >= nbKind ? ruleForKind.maxNumber - nbKind : 0, // Available creeps for maxNumber
                role: ruleForKind.role
            })
        }

        // Loop over required creeps
        for (let i in populations) {
            let population = populations[i]
            if (population.required > 0) {
                this.spawnCreep(room, population.role, true)
                return
            }
        }

        // Loop over available space for additional creeps
        for (let i in populations) {
            let population = populations[i]
            if (population.spaceLeft > 0) {
                this.spawnCreep(room, population.role, false)
                return
            }
        }
    },

    /**
     * @param {Room} room
     * @param {Role} role
     * @param {boolean} forceInstantCreation
     */
    spawnCreep: function(room, role, forceInstantCreation) {
        let spawn = room.find(FIND_MY_SPAWNS)[0]
        let energy = forceInstantCreation ? Math.max(room.energyAvailable, 300) : room.energyCapacityAvailable

        spawn.spawnCreep(
            role.getCreepBodyPartsToSpawn(room, energy),
            role.label + "-" + Game.time,
            {memory: {role: role.label}}
        )
    }
}

module.exports = populationManager