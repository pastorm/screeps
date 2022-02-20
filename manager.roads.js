let roadManager = {
    tick: function(room) {

        let spawns = room.find(FIND_MY_SPAWNS)
        let sources = room.find(FIND_SOURCES)
        let controllers = room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_CONTROLLER } })

        for (let spawn_index = 0; spawn_index < spawns.length; spawn_index++)
            for (let source_index = 0; source_index < sources.length; source_index++)
            {
                let paths = spawns[spawn_index].pos.findPathTo(sources[source_index].pos)
                for (let path_index = 0; path_index < paths.length; path_index++) 
                {
                    room.createConstructionSite(paths[path_index].x,paths[path_index].y, STRUCTURE_ROAD)
                }
            }

            for (let controller_index = 0; controller_index < controllers.length; controller_index++)
            {
                let paths = spawns[spawn_index].pos.findPathTo(controllers[controller_index].pos)
                for (let path_index = 0; path_index < paths.length; path_index++) 
                {
                    room.createConstructionSite(paths[path_index].x,paths[path_index].y, STRUCTURE_ROAD)
                }
            }
        }
};

module.exports = roadManager;
