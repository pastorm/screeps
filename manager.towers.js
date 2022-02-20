let towerManager = {
    tick: function(room) {

        let towers = room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => structure.structureType === STRUCTURE_TOWER
            })

        for (let towerIndex in towers) {
            let tower = towers[towerIndex]

            let closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            })
            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure)
            }

            let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
            if(closestHostile) {
                tower.attack(closestHostile)
            }
        }
    }
}

module.exports = towerManager