import { world, EntityQueryOptions, Location, Entity } from "mojang-minecraft";

/**
 * Minecraft Bedrock Mob Stacker
 * @license MIT
 * @author Smell of curry
 * @version 2.0.0
 * --------------------------------------------------------------------------
 * This is a mob stacker that works by getting all entitys in the game
 * then it gets the closest mob to each entity and kills it and adds that
 * entity to the orginal entitys current stack, and on death respawns -1 stack
 * --------------------------------------------------------------------------
 */

/**
 * This is a list of the mobs that will be stacked
 * to add antoher mob add a new line and write the
 * entitys ID
 */
const STACKABLE_MOBS = [
  "minecraft:pig",
  "minecraft:sheep",
  "minecraft:cow",
  "minecraft:cod",
  "minecraft:salmon",
  "minecraft:pufferfish",
  "minecraft:silverfish",
  "minecraft:tropicalfish",
  "minecraft:cow",
  "minecraft:fox",
  "minecraft:goat",
  "mushroomcow",
  "minecraft:panda",
  "minecraft:pig",
  "minecraft:bat"
];

/**
 * Returns the closets entity
 * @param {Entity} entity your using
 * @param {number} maxDistance max distance away
 * @param {String} type type of entity you want to get
 * @returns {Entity | null}

 * @example getClosetEntity(Entity, 10, Entity.id, 1)
 */
function getClosetEntity(entity, maxDistance = null, type = false) {
  let q = new EntityQueryOptions();
  q.location = entity.location;
  q.closest = 2;
  if (type) q.type = type;
  if (maxDistance) q.maxDistance = maxDistance;
  let entitys = [...entity.dimension.getEntities(q)];
  entitys.shift();
  return entitys?.[0];
}

/**
 * Returns a location of the inputed aguments
 * @param {Entity} entity your using
 * @param {string} value what you want to search for
 * @example getTagStartsWith(Entity, 2)
 */
function getTagStartsWith(entity, value) {
  const tags = entity.getTags();
  if (tags.length === 0) return null;
  const tag = tags.find((tag) => tag.startsWith(value));
  if (!tag) return null;
  if (tag.length < value.length) return null;
  return tag.substring(value.length);
}

/**
 * Convert seconds to number like 0:00:00
 * @param {string} string The string you want to captliaze
 * @returns {string}

 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Gets the name of a entity after : in id
 * @param {String} entityName entity you want to test
 * @returns {String}

 * @example getGenericName(Entity);
 */
function getGenericName(entityName) {
  return entityName.split(":")[1].replace(/_/g, " ");
}

/**
 * Returns the current stack of the entity
 * @param {Entity} entity your using
 * @param {number} value what stack ammount you want it to have
 * @returns {number} number of stack
 * @example getStack(Entity)
 */
function getStack(entity) {
  const value = getTagStartsWith(entity, "stack:") ?? "1";
  return parseInt(value);
}

/**
 * Sets the stack of a entity
 * @param {Entity} entity your using
 * @param {number} value what stack ammount you want it to have
 * @example setStack(Entity, 2)
 */
function setStack(entity, value) {
  const current_stack = getStack(entity);
  entity.removeTag(`stack:${current_stack.toString()}`);
  entity.addTag(`stack:${value.toString()}`);
  entity.addTag(`is_stacked`);
  const name = capitalizeFirstLetter(getGenericName(entity.id));
  entity.nameTag = `ยงb${value}x ยง6${name} `;
}

world.events.tick.subscribe(() => {
  for (const entity of world.getDimension("overworld").getEntities()) {
    if (!entity || !STACKABLE_MOBS.includes(entity.id)) continue;
    let ce = getClosetEntity(entity, 10, entity.id);
    if (!ce) continue;
    setStack(entity, getStack(entity) + getStack(ce));
    ce.teleport(new Location(0, -64, 0), ce.dimension, 0, 0);
    ce.kill();
  }
});

// THIS IS entityHit Right now but it should be entityHurt, once the
// next beta is release then i will change this but there is a bug
// that caused the entityHurt event to not send back data on death

world.events.entityHit.subscribe(({ hitEntity }) => {
  if (!hitEntity || !hitEntity.hasTag("is_stacked")) return;
  if (hitEntity.getComponent("minecraft:health").current ?? 0 > 0) return;
  const stack = getStack(hitEntity);
  if (stack <= 1) return;
  const newEntity = hitEntity.dimension.spawnEntity(
    hitEntity.id,
    hitEntity.location
  );
  setStack(newEntity, stack - 1);
});
