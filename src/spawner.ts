import harvesterRole from './role.harvester';

function spawn() {
    const harvesters = _.filter(Game.creeps, (creep: Creep) => creep.memory.role === harvesterRole.TYPE);
    if (harvesters.length < 2) {
        var name = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + name);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], name, { memory: { role: harvesterRole.TYPE } });
    }
}

export default {
    spawn: spawn,
};