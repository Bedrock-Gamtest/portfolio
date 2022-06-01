export const native = {
  toObject(
    objectFrom,
    value = "<Function>",
    ignoreFunctions = true,
    ignoreObjectFunctions = true
  ) {
    let clone = {};
    inF(objectFrom, value, "objectFrom");

    function inF(ThisObject, Setvalue, logPath) {
      for (const key in ThisObject) {
        if (
          typeof ThisObject[key] === "object" &&
          !Array.isArray(ThisObject[key])
        ) {
          clone = new Function(
            "object",
            "value",
            `{ object${
              logPath.replaceAll("objectFrom", "") + `['${key}']`
            } = {}; return object}`
          )(clone);
          inF(ThisObject[key], Setvalue, logPath + "['" + key + "']");
        } else {
          // log ? console.warn(logPath + `['${key}'] = ${Setvalue};`) : null;
          let valueMain;
          if (typeof ThisObject[key] === "function") {
            if (ignoreFunctions) {
              continue;
            } else if (ignoreObjectFunctions && hasKey(key)) {
              continue;
            } else {
              valueMain = value;
            }
          } else {
            valueMain = ThisObject[key];
          }

          clone = new Function(
            "object",
            "value",
            `{ object${
              logPath.replaceAll("objectFrom", "") + `['${key}']`
            } = value; return object}`
          )(clone, valueMain);
        }
      }
    }
    return clone;
  },
  stringify(objectFrom, value, ignoreFunctions, ignoreObjectFunctions) {
    return JSON.stringify(
      this.toObject(objectFrom, value, ignoreFunctions, ignoreObjectFunctions)
    );
  },
};
