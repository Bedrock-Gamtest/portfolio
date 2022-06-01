import { world } from "mojang-minecraft";
const adminTag = "admin",
  bannedBlocks = ["minecraft:beehive", "minecraft:wood", "minecraft:dirt"];
world.events.beforeItemUseOn.subscribe(
  (data) =>
    !data.source.hasTag(adminTag) &&
    bannedBlocks.includes(data.item.id) &&
    (data.cancel = true)
);
