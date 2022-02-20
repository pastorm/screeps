const roomManager = require('manager.room')

module.exports.loop = function () {

    // Suppression de la mémoire des screeps defunts
    for(let i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i]
        }
    }

    // Boucle principale sur chaque room
    for (let roomName in Game.rooms)
    {
        let room = Game.rooms[roomName]
        roomManager.tick(room)
    }
}