import { shouldHarvest, harvest, moveCreepToReserve } from "./creep";

export default {
    run: (creep: Creep) => {
        if (shouldHarvest(creep)) {
            harvest(creep);
        } else {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                    );
                },
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
                }
            } else {
                moveCreepToReserve(creep);
            }
        }
    },
    TYPE: "harvester" as CreepRole,
};
