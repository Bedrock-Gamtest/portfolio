import { BlockLocation } from "mojang-minecraft";

/**
 * Converts a location to a block location
 * @param {Location} loc a location to convert
 * @returns {BlockLocation}
 */
function locationToBlockLocation(loc) {
  return new BlockLocation(
    Math.floor(loc.x),
    Math.floor(loc.y),
    Math.floor(loc.z)
  );
}
