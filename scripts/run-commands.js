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

/**
 * Run an array of commands
 * @param {Array<string>} commands Put '%' before your commands. It will make it so it only executes if all the commands thta came before it executed successfully!
 * @returns {{ error: boolean }}
 * @example runCommands([
 * 'clear "Smell of curry" diamond 0 0',
 * '%say Smell of curry has a Diamond!'
 * ]);
 */
function runCommands(commands) {
  try {
    const conditionalRegex = /^%/;
    if (conditionalRegex.test(commands[0]))
      throw new Error(
        "[Server]: runCommands(): Error - First command in the Array CANNOT be Conditional"
      );
    let error = false;
    commands.forEach((cmd) => {
      if (error && conditionalRegex.test(cmd)) return;
      error = runCommand(cmd.replace(conditionalRegex, "")).error;
    });
  } catch (error) {
    return { error: error };
  }
}
