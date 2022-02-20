let roomManager = require('manager.room')

module.exports.loop = function () {

    // Suppression de la mémoire des screeps defunts
    for(let i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i]
        }
    }

    for (let roomName in Game.rooms)
    {
        let room = Game.rooms[roomName]
        roomManager.tick(room)
    }

    // let tower = Game.getObjectById('TOWER_ID')
    // if(tower) {
    //     let closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    //         filter: (structure) => structure.hits < structure.hitsMax
    //     })
    //     if(closestDamagedStructure) {
    //         tower.repair(closestDamagedStructure)
    //     }
    //
    //     let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
    //     if(closestHostile) {
    //         tower.attack(closestHostile)
    //     }
    // }
}