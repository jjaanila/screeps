function shouldHarvest(creep: Creep) {
    return !creep.memory.isWorking && creep.store[RESOURCE_ENERGY] < creep.store.getCapacity();
}

function upgradeController(creep: Creep) {
    if (!creep.room.controller) {
        return;
    }
    const result = creep.upgradeController(creep.room.controller);
    switch (result) {
        case OK:
            creep.memory.isWorking = true;
            break;
        case ERR_NOT_ENOUGH_RESOURCES:
            creep.memory.isWorking = false;
            break;
        case ERR_NOT_IN_RANGE:
            creep.moveTo(creep.room.controller);
            break;
        default:
            break;
    }
}

function harvestSource(creep: Creep, source: Source) {
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
    }
}

function getNewSourceToHarvest(creep: Creep): Source {
    let sources = creep.room.find(FIND_SOURCES_ACTIVE);
    if (creep.memory.harvestTargetSource) {
        // Let's not accept the old source
        sources = sources.filter((source) => source !== creep.memory.harvestTargetSource);
    }
    return sources[Math.floor(Math.random() * sources.length)];
}

export default {
    run: function (creep: Creep) {
        if (shouldHarvest(creep)) {
            creep.memory.isHarvesting = true;
            if (!creep.memory.harvestTargetSource) {
                creep.memory.harvestTargetSource = getNewSourceToHarvest(creep);
            }
            if (creep.harvest(creep.memory.harvestTargetSource) == ERR_NOT_IN_RANGE) {
                switch (creep.moveTo(creep.memory.harvestTargetSource)) {
                    case ERR_NO_PATH:
                        creep.memory.harvestTargetSource = getNewSourceToHarvest(creep);
                    default:
                        break;
                }
            }
        } else {
            upgradeController(creep);
        }
    },
    TYPE: "upgrader" as CreepRole,
};
