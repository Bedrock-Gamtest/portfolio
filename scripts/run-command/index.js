import { world } from "mojang-minecraft";

/**
 * Runs a Command
 * @param {string} command a minecraft /command
 * @param {string} dimension: "overworld" | "nether" | "the end"
 * @param {boolean} debug: true console logs the command, else it runs command
 * @example runCommand(`say test`)
 */
function runCommand(command, dimension = "overworld", debug = false) {
  try {
    return debug
      ? console.warn(JSON.stringify(this.runCommand(command)))
      : world.getDimension(dimension).runCommand(command);
  } catch (error) {
    return { error: true };
  }
}
