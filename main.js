let roomManager = require('manager.room');

module.exports.loop = function () {

    for (let roomName in Game.rooms)
    {
        let room = Game.rooms[roomName]
        roomManager.tick(room)
    }

    // let tower = Game.getObjectById('TOWER_ID');
    // if(tower) {
    //     let closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    //         filter: (structure) => structure.hits < structure.hitsMax
    //     });
    //     if(closestDamagedStructure) {
    //         tower.repair(closestDamagedStructure);
    //     }
    //
    //     let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    //     if(closestHostile) {
    //         tower.attack(closestHostile);
    //     }
    // }
    //
    // for(let name in Game.creeps) {
    //     let creep = Game.creeps[name];
    //     if(creep.memory.role === 'harvester') {
    //         roleHarvester.run(creep);
    //     }
    //     if(creep.memory.role === 'upgrader') {
    //         roleUpgrader.run(creep);
    //     }
    //     if(creep.memory.role === 'builder') {
    //         roleBuilder.run(creep);
    //     }
    // }
}