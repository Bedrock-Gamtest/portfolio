import { world } from 'mojang-minecraft';

/**
 * Get score of a target.
 * @param {string|} target you want to test
 * @param {string} objective Objective name you want to search
 * @returns {number} 0
 * @example 
 * getScore(Entity, 'Money');
 * getScore('Steve', 'Money');
 * getScore('@r[name="Steve"]', 'Money');
 * getScore('@"Steve XD"', 'Money');
 */
export function getScore(target, objective) {
  const overworld = world.getDimension('overworld');
  const query = player.match(/\(@"|\").+\"/g) ? target:'"'+target+'"';
  try {
    const command = overworld.runCommand(
      `scoreboard players test ${query} "${objective}" * *`
    );
    return parseInt(String(command.statusMessage?.split(" ")[1]), 10);
  } catch (error) {
    return 0;
  }
}
