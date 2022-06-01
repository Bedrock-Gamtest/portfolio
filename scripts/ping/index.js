SA.build.command.register(
  {
    name: "ping",
    description: "Returns the current TPS of the servers ping",
    usage: [""],
  },
  (data, args) => {
    let pingTick = world.events.tick.subscribe(({ currentTick, deltaTime }) => {
      world.events.tick.unsubscribe(pingTick);
      return SA.build.chat.broadcast(
        `Server TPS: ${1 / deltaTime}`,
        data.sender.nameTag
      );
    });
  }
);
