import { world } from "mojang-minecraft";

world.events.beforeChat.subscribe((data) => {
  try {
    return (
      (data.cancel = true),
      world.getDimension("overworld").runCommand(
        `tellraw @a {"rawtext":[{"text":"§l§8[§r${
          data.sender
            .getTags()
            .find((tag) => tag.startsWith("rank:"))
            ?.substring(5)
            ?.replaceAll("--", "§r§l§8][§r") ?? "§bMember"
        }§l§8]§r §7${data.sender.nameTag}:§r ${data.message}"}]}`
      )
    );
  } catch (error) {
    return (data.cancel = false), console.warn(`${error}, ${error.stack}`);
  }
});
