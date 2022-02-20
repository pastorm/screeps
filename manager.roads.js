let roadManager = {
    tick: function(room) {

        let spawns = room.find(FIND_MY_SPAWNS)
        let sources = room.find(FIND_SOURCES)
        let controllers = room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_CONTROLLER } })

        this.buildRoad(room, spawns, sources)
        this.buildRoad(room, spawns, controllers)
        this.buildRoad(room, sources, controllers)
    },

    /** @param {Room} room **/
    /** @param {Array} departures **/
    /** @param {Array} arrivals **/
    buildRoad: function(room, departures, arrivals) {
        for (let departures_index = 0; departures_index < departures.length; departures_index++) {
            for (let arrival_index = 0; arrival_index < arrivals.length; arrival_index++)
            {
                let paths = room.findPath(departures[departures_index].pos, arrivals[arrival_index].pos, { ignoreCreeps: true, ignoreRoads: true })
                // lenght-1 to avoid building road on arrival
                for (let path_index = 0; path_index < paths.length - 1; path_index++) 
                {
                    room.createConstructionSite(paths[path_index].x,paths[path_index].y, STRUCTURE_ROAD)
                }
            }
        }

    }
};

module.exports = roadManager;
