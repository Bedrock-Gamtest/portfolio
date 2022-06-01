/**
 * Get score of an entity
 * @param {Entity} entity you want to test
 * @param {string} objective Objective name you want to search
 * @returns {number} 0
 * @example getScore(Entity, 'Money');
 */
function getScore(entity, objective) {
  try {
    const command = entity.runCommand(
      `scoreboard players test @s "${objective}" * *`
    );
    return parseInt(String(command.statusMessage?.split(" ")[1]), 10);
  } catch (error) {
    return 0;
  }
}
