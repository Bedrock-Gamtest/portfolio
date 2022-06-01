import { Location } from "mojang-minecraft";

/**
 * Returns a location of the inputed aguments
 * @param {string} x x agument
 * @param {string} y y agument
 * @param {string} z z agument
 * @param {Array<number>} location player.location used
 * @param {Array<number>} viewVector player.viewVector used
 * @returns {Location}
 * @example parseLocationAugs(["~1", "3", "^7"], { location: [1,2,3] , viewVector: [1,2,3] })
 */
function parseLocationAugs([x, y, z], { location, viewVector }) {
  if (!x || !y || !x) return new Error("Undefined Input");
  const a = [x, y, z].map((arg) => {
    const r = parseInt(arg.replace(/\D/g, ""));
    return isNaN(r) ? 0 : r;
  });
  const b = [x, y, z].map((arg, index) => {
    return arg.includes("~")
      ? a[index] + location[index]
      : arg.includes("^")
      ? a[index] + viewVector[index]
      : a[index];
  });
  return new Location(b[0], b[1], b[2]);
}
