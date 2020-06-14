import spawner from './spawner';
import harvesterRole from './role.harvester';
module.exports.loop = () => {
    console.log('loop-de-loop');
    spawner.spawn();
    for (let creepName in Game.creeps) {
        if (Game.creeps[creepName].memory.role === 'harvester') {
            harvesterRole.run(Game.creeps[creepName]);
        }
    }
};