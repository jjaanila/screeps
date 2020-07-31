import { harvest, shouldHarvest } from "./creep";

function getNewConstructionSiteToBuild(creep: Creep): ConstructionSite | undefined {
    let constructionSites = _.sortBy(creep.room.find(FIND_MY_CONSTRUCTION_SITES), "id"); // Sorting focuses all builders to one site at a time.
    if (creep.memory.buildTargetConstructionSiteId) {
        // Let's not accept the old source
        constructionSites = constructionSites.filter(
            (constructionSite) => constructionSite.id !== creep.memory.buildTargetConstructionSiteId
        );
    }
    if (!constructionSites.length) {
        return;
    }
    return constructionSites[0];
}

function build(creep: Creep) {
    if (!creep.memory.buildTargetConstructionSiteId) {
        creep.memory.buildTargetConstructionSiteId = getNewConstructionSiteToBuild(creep)?.id;
        if (!creep.memory.buildTargetConstructionSiteId) {
            creep.say("0 sites");
            return;
        }
    }
    const constructionSite = Game.getObjectById(creep.memory.buildTargetConstructionSiteId) as ConstructionSite;
    switch (creep.build(constructionSite)) {
        case OK:
            creep.memory.isWorking = true;
            break;
        case ERR_NOT_ENOUGH_RESOURCES:
            creep.memory.isWorking = false;
            delete creep.memory.buildTargetConstructionSiteId;
            break;
        case ERR_NOT_IN_RANGE:
            switch (creep.moveTo(constructionSite)) {
                case ERR_NO_PATH:
                    creep.memory.buildTargetConstructionSiteId = getNewConstructionSiteToBuild(creep)?.id;
                default:
                    break;
            }
            break;
        default:
            break;
    }
}

export default {
    run: (creep: Creep) => {
        if (shouldHarvest(creep)) {
            harvest(creep);
        } else {
            build(creep);
        }
    },
    TYPE: "builder" as CreepRole,
};
