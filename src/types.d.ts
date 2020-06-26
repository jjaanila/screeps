// example declaration file - remove these and add your own custom typings

type CreepRole = "harvester" | "builder" | "upgrader";

// memory extension samples
interface CreepMemory {
    role: CreepRole;
    isWorking: boolean;
    harvestTargetSourceId?: string;
    buildTargetConstructionSiteId?: string;
}

interface Memory {
    uuid: number;
    log: any;
}

// `global` extension samples
declare namespace NodeJS {
    interface Global {
        log: any;
    }
}
