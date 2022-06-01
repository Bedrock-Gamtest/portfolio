/**
 * Compare a array of numbers with 2 arrays
 * @param {number[]} XYZa The first set of numbers
 * @param {number[]} XYZb The second set of numbers
 * @param {number[]} XYZc The set of numbers that should between the first and second set of numbers
 * @example betweenXYZ([1, 0, 1], [22, 81, 10], [19, 40, 6]));
 * @returns {boolean}
 */
export const betweenXYZ = (XYZa: number[], XYZb: number[], XYZc: number[]) =>
  XYZc.length ===
  XYZc.filter(
    (c: number, i: number) =>
      c >= Math.min(XYZa[i], XYZb[i]) && c <= Math.max(XYZa[i], XYZb[i])
  ).length;
