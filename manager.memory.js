let memoryManager = {
    tick: function (room) {

        let memory = room.memory
        // if (memory.sources === undefined) {
            this.initMemory(room, memory)
        // }

        this.updateFreeSlots(room, memory)
        // console.log("Tick memory for "+room.name+" with " + JSON.stringify(memory))
    },

    /** @param {Room} room **/
    /** @param {Memory} memory **/
    initMemory: function(room, memory) {

        memory.sources = []
        let terrain = Game.map.getRoomTerrain(room.name)
        let sources = room.find(FIND_SOURCES)

        for (let sourceIndex in sources) {
            let source = sources[sourceIndex]
            let slots = this.findTerrainSlots(terrain, source.pos, room)
            memory.sources.push({
                source,
                terrainSlots: slots,  // Liste d'emplacements disponibles autour de la source
                freeSlotCount: slots.length  // Nombre d'emplacements inoccupés autour de la source
            })
        }
    },

    /** @param {Terrain} Terrain **/
    /** @param {RoomPosition} roomPosition **/
    findTerrainSlots: function(terrain, roomPosition, room) {
        let slots = []

        for (let x=roomPosition.x-1; x<=roomPosition.x+1; x++) {
            for (let y=roomPosition.y-1; y<=roomPosition.y+1; y++) {
                if (terrain.get(x, y) !== TERRAIN_MASK_WALL) {
                    // Center block is WALL so no need to filter it out
                    slots.push(room.getPositionAt(x, y))
                }
            }
        }
        return slots
    },

    /** @param {Room} room **/
    /** @param {Memory} memory **/
    updateFreeSlots: function(room, memory) {
        for (let sourceIndex in memory.sources) {
            let source = memory.sources[sourceIndex]

            let count = 0

            for (let posIndex in source.terrainSlots) {
                let pos = source.terrainSlots[posIndex]
                let obstacles = room.lookForAt(LOOK_STRUCTURES, pos).concat(room.lookForAt(LOOK_CONSTRUCTION_SITES, pos)).concat(room.lookForAt(LOOK_CREEPS, pos))
                obstacles = obstacles.filter((item) => {
                    // console.log(JSON.stringify(item))
                    if (item instanceof ConstructionSite) {
                        if (item.structureType === STRUCTURE_ROAD)
                            return false
                    }
                    else if (item instanceof Structure) {
                        if (item.structureType === STRUCTURE_ROAD)
                            return false
                    }

                    return true
                })
                if (obstacles.length === 0) {
                    count ++
                }
            }
            // console.log('tick free slots : ' + count)
            source.freeSlotCount = count
        }
        // console.log('---')
    },

    /** @param {RoomPosition} roomPosition **/
    findClosestSource(roomPosition) {
        let room = Game.rooms[roomPosition.roomName]
        return undefined
    },
}

module.exports = memoryManager