type CreepRole = "harvester" | "builder" | "upgrader";

interface CreepMemory {
    role: CreepRole;
    isWorking: boolean;
    harvestTargetSourceId?: string;
    buildTargetConstructionSiteId?: string;
}
