import { DynamicPropertiesDefinition, world } from "mojang-minecraft";

/**
 * Minecraft Bedrock Gametest Database
 * @license MIT
 * @author Smell of curry
 * @version 1.0.0
 * --------------------------------------------------------------------------
 * This is a updated database that uses dynamic properties to save data in the
 * world. This system is way better than scores and is also faster. Also if
 * nothing new is being saved this database calls from memory to speed up gets
 * --------------------------------------------------------------------------
 */

/**
 * The max string size of a objective, 32768 is max NBT
 */
const MAX_DATABASE_STRING_SIZE = 4294967295;

/**
 * A list of table names that need to be registered
 * @type {Array<String>}
 */
const TABLES = [];

world.events.worldInitialize.subscribe(({ propertyRegistry }) => {
  let def = new DynamicPropertiesDefinition();
  for (const table of TABLES) {
    def.defineString(table, MAX_DATABASE_STRING_SIZE);
  }
  propertyRegistry.registerWorldDynamicProperties(def);
});

export class Database {
  /**
   * Creates a new database
   * @param {String} TABLE_NAME a three letter short name for this DB
   */
  constructor(TABLE_NAME) {
    this.TABLE_NAME = "DB_" + TABLE_NAME;
    this.MEMORY = {};
    TABLES.push(this.TABLE_NAME);
    this.fetched = false;
  }

  /**
   * Gets the database from the world
   * @returns {Object}
   */
  get data() {
    if (this.fetched) return this.MEMORY;
    const data = JSON.parse(world.getDynamicProperty(this.TABLE_NAME) ?? {});
    this.MEMORY = data;
    this.fetched = true;
    return data;
  }

  /**
   * Saves local memory data to database
   * @param {Object} json value to save to DB
   */
  save(json) {
    world.setDynamicProperty(this.TABLE_NAME, JSON.stringify(json));
    this.MEMORY = json;
  }

  /**
   * Returns a value of a key
   * @param {String} key key to grab
   * @returns {any | null}
   */
  get(key) {
    const data = this.data;
    return data[key];
  }

  /**
   * Sets a value into the database
   * @param {String} key key to set
   * @param {any} value value to set for the key
   */
  set(key, value) {
    let data = this.data;
    data[key] = value;
    this.save(data);
  }

  /**
   * Check if the key exists in the table
   * @param {string} key
   * @returns {boolean}
   */
  has(key) {
    return this.keys().includes(key);
  }

  /**
   * Delete the key from the table
   * @param {String} key
   * @returns {Boolean}
   */
  delete(key) {
    let json = this.data;
    const status = delete json[key];
    this.save(json);
    return status;
  }

  /**
   * Returns the number of key/value pairs in the Map object.
   * @returns {number}
   */
  size() {
    return this.keys().length;
  }

  /**
   * Clear everything in the table
   */
  clear() {
    this.save({});
  }

  /**
   * Get all the keys in the table
   * @returns {Array<string>}
   */
  keys() {
    return Object.keys(this.data);
  }

  /**
   * Get all the values in the table
   * @returns {Array<any>}
   */
  values() {
    return Object.values(this.data);
  }

  /**
   * Gets all the keys and values
   * @returns {Object}
   */
  getCollection() {
    return this.data;
  }
}
