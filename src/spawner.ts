import builderRole from "./roles/builder";
import harvesterRole from "./roles/harvester";
import upgraderRole from "./roles/upgrader";

const NUMBER_OF_HARVESTERS = 1;
const NUMBER_OF_BUILDERS = 2;
const NUMBER_OF_UPGRADERS = 2;

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
    const name = role + Game.time;
    console.log(`Spawning ${name}`);
    spawn.spawnCreep(body, name, { memory: { role, isWorking: false } });
}

function run() {
    const creepsByRole = _.groupBy(Game.creeps, (creep) => creep.memory.role);
    if ((creepsByRole[builderRole.TYPE]?.length || 0) < NUMBER_OF_BUILDERS) {
        spawn(Game.spawns["Spawn1"], [WORK, CARRY, MOVE], builderRole.TYPE);
    }
    if ((creepsByRole[harvesterRole.TYPE]?.length || 0) < NUMBER_OF_HARVESTERS) {
        spawn(Game.spawns["Spawn1"], [WORK, CARRY, MOVE], harvesterRole.TYPE);
    }
    if ((creepsByRole[upgraderRole.TYPE]?.length || 0) < NUMBER_OF_UPGRADERS) {
        spawn(Game.spawns["Spawn1"], [WORK, CARRY, MOVE], upgraderRole.TYPE);
    }
}

export default {
    run: run,
};
