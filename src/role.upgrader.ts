export default {
    run: function (creep: Creep) {
        if (!creep.memory.isWorking && creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
            creep.memory.isGathering = true;
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        } else {
            if (
                !creep.memory.isWorking &&
                creep.room.controller &&
                creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE
            ) {
                creep.memory.isWorking = true;
                creep.moveTo(creep.room.controller);
            }
        }
    },
    TYPE: "upgrader" as CreepRole,
};
