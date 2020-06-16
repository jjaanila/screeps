import spawner from "./spawner";
import builderRole from "./role.builder";
import harvesterRole from "./role.harvester";
import upgraderRole from "./role.upgrader";

const roles = [builderRole, harvesterRole, upgraderRole];

module.exports.loop = () => {
    spawner.run();
    for (let creepName in Game.creeps) {
        for (let role of roles) {
            if (Game.creeps[creepName].memory.role === role.TYPE) {
                role.run(Game.creeps[creepName]);
            }
        }
    }
};
