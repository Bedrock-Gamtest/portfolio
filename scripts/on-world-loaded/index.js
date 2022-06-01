import { world } from "mojang-minecraft";

/**
 * Await till world loaded to call a functiom
 * @param {(data: BeforeChatEvent, args: Array<string>) => void} callback Code you want to execute when the command is executed
 * @example
 *  onWorldLoad(function () {
 *    console.log(`world loaded`)
 * });
 */
function onWorldLoad(callback) {
  let TickCallback = world.events.tick.subscribe((tickEvent) => {
    try {
      world.getDimension("overworld").runCommand(`testfor @a`);
      world.events.tick.unsubscribe(TickCallback);
      callback();
    } catch (error) {}
  });
}
