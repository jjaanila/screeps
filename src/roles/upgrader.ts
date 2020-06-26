import { harvest, shouldHarvest } from "./creep";

function upgradeController(creep: Creep) {
    if (!creep.room.controller) {
        return;
    }
    switch (creep.upgradeController(creep.room.controller)) {
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

export default {
    run: function (creep: Creep) {
        if (shouldHarvest(creep)) {
            harvest(creep);
        } else {
            upgradeController(creep);
        }
    },
    TYPE: "upgrader" as CreepRole,
};
