import { world } from "mojang-minecraft";

world.events.beforeChat.subscribe((chatEvent) => {
  if (chatEvent.message.startsWith("$")) {
    chatEvent.cancel = true;
    return new Function(chatEvent.message.substring(1));
  }
});
