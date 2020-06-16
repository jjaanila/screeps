export default {
    run: (creep: Creep) => {
        if (creep.memory.isWorking && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.isWorking = false;
            creep.say("Har har harvest!");
        }
        if (!creep.memory.isWorking && creep.store.getFreeCapacity() == 0) {
            creep.memory.isWorking = true;
            creep.say("I build!");
        }

        if (creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffffff" } });
            }
        }
    },
    TYPE: "builder" as CreepRole,
};
