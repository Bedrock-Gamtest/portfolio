import { world } from "mojang-minecraft";

/**
 * Broadcast a message in chat
 * @param {string} text Message or a lang code
 * @param {string} player Player you want to broadcast to
 * @param {Array<string>} with_ lang arguments
 * @returns {any} For commands that return data, returns a JSON structure with command response values.
 * @example 
 * broadcast('Hello World!');
 * broadcast('Hello World!',"@a[tag=smelly]");
 * broadcast('Hello World!',"@r[tag=hi]");
 */
export function broadcast(text, player, args = []) {
  try {
    const query = player.match(/\(@"|\").+\"/g) ? player:'"'+player+'"';
    args = args.map(String).filter((n) => n);
    return world
      .getDimension("overworld")
      .runCommand(
        `tellraw ${
          player ? `${query}` : "@a"
        } {"rawtext":[{"translate":"${text}","with":${JSON.stringify(args)}}]}`
      );
  } catch (error) {
    return { error: true };
  }
}
