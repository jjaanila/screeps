import builderRole from "./role.builder";
import harvesterRole from "./role.harvester";
import upgraderRole from "./role.upgrader";

function canSpawn(spawn: StructureSpawn) {
    const returnCode = spawn.spawnCreep([], "dummy", { dryRun: true });
    if (returnCode !== OK) {
        console.log(`Can't spawn: ${returnCode}`);
    }
    return returnCode === OK;
}

function spawn(spawn: StructureSpawn, body: BodyPartConstant[], role: CreepRole) {
    if (canSpawn(spawn)) {
        return;
    }
    var name = role + Game.time;
    console.log(`Spawning ${name}`);
    spawn.spawnCreep(body, name, { memory: { role, isWorking: false, isGathering: false } });
}

function run() {
    const creepsByRole = _.groupBy(Game.creeps, (creep) => creep.memory.role);
    if ((creepsByRole[harvesterRole.TYPE]?.length || 0) < 2) {
        spawn(Game.spawns["Spawn1"], [WORK, CARRY, MOVE], harvesterRole.TYPE);
    }
    if ((creepsByRole[builderRole.TYPE]?.length || 0) < 1) {
        spawn(Game.spawns["Spawn1"], [WORK, CARRY, MOVE], builderRole.TYPE);
    }
    if ((creepsByRole[upgraderRole.TYPE]?.length || 0) < 1) {
        spawn(Game.spawns["Spawn1"], [WORK, CARRY, MOVE], upgraderRole.TYPE);
    }
}

export default {
    run: run,
};
