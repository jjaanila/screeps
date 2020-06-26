import spawner from "./spawner";
import builderRole from "./roles/builder";
import harvesterRole from "./roles/harvester";
import upgraderRole from "./roles/upgrader";

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
