const daily_reward_hours = 24;

SA.build.command.register(
  {
    cancelMessage: true,
    name: "daily",
    description: "Claim Daily rewards",
    example: [`daily claim`],
  },
  (data, args) => {
    if (args[0] !== "claim") return;
    const cooldown =
      data.sender
        .getTags()
        .find((tag) => tag.startsWith("daily_reward:"))
        ?.substring(9) ?? null;
    if (cooldown > Date.now()) {
      return SA.build.chat.broadcast(
        `You have already claimed your reward for today! You have §b${Math.ceil(
          (cooldown - Date.now()) / 3.6e6
        )} Hours §cleft!`,
        data.sender.nameTag
      );
    } else {
      data.sender.removeTag(`daily_reward:${JSON.stringify(cooldown)}`);
      data.sender.addTag(
        `daily_reward:${Date.now() + daily_reward_hours * 3.6e6}`
      );
      data.sender.runCommand(`give @s diamond 0 1`);
      return SA.build.chat.broadcast(
        `Claimed Daily Reward`,
        data.sender.nameTag
      );
    }
  }
);
