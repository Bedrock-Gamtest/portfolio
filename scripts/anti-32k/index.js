import {
  MinecraftEnchantmentTypes,
  InventoryComponentContainer,
  EnchantmentList,
  world,
} from "mojang-minecraft";

/**
 * Minecraft Bedrock Anti Hacked Items
 * @license MIT
 * @author Smell of curry
 * @version 1.0.0
 * --------------------------------------------------------------------------
 * This is a anti hacked items, meaning it checks a players inventory every
 * tick then it tests if they have any banned items, then checks if they have
 * items that have hacked enchants and clears the item from inventory
 * --------------------------------------------------------------------------
 */

world.events.tick.subscribe((data) => {
  for (const player of world.getPlayers()) {
    /**
     * @type {InventoryComponentContainer}
     */
    const container = player.getComponent("minecraft:inventory").container;
    for (let i = 0; i < container.size; i++) {
      const item = container.getItem(i);
      if (!item) continue;
      /**
       * @type {EnchantmentList}
       */
      const enchantments = item.getComponent("enchantments").enchantments;
      let change = false;
      for (const Enchantment in MinecraftEnchantmentTypes) {
        const ItemEnchantment = enchantments.getEnchantment(
          MinecraftEnchantmentTypes[Enchantment]
        );
        if (!ItemEnchantment) continue;
        const remove = () => {
          enchantments.removeEnchantment(ItemEnchantment.type);
          change = true;
        };
        if (enchantments.slot == 0) {
          if (!enchantments.canAddEnchantment(ItemEnchantment)) remove();
        } else {
          if (ItemEnchantment.level > ItemEnchantment.type.maxLevel) remove();
        }
      }
      if (!change) continue;
      item.getComponent("enchantments").enchantments = enchantments;
      container.setItem(i, item);
    }
  }
});
