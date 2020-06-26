function getNewSourceToHarvest(creep: Creep): Source {
    let sources = creep.room.find(FIND_SOURCES_ACTIVE);
    if (creep.memory.harvestTargetSourceId) {
        // Let's not accept the old source
        sources = sources.filter((source) => source.id !== creep.memory.harvestTargetSourceId);
    }
    return sources[Math.floor(Math.random() * sources.length)];
}

export function shouldHarvest(creep: Creep) {
    return !creep.memory.isWorking && creep.store[RESOURCE_ENERGY] < creep.store.getCapacity();
}

export function harvest(creep: Creep) {
    if (!creep.memory.harvestTargetSourceId) {
        creep.memory.harvestTargetSourceId = getNewSourceToHarvest(creep).id;
    }
    const source = Game.getObjectById(creep.memory.harvestTargetSourceId) as Source;
    switch (creep.harvest(source)) {
        case OK:
            break;
        case ERR_NOT_IN_RANGE:
            switch (creep.moveTo(source)) {
                case ERR_NO_PATH:
                    creep.memory.harvestTargetSourceId = getNewSourceToHarvest(creep).id;
                default:
                    break;
            }
            break;
        default:
            break;
    }
}
