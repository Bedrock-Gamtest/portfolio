```json
{
  "format_version": 2,
  "header": {
    "name": "pack.name",
    "description": "pack.description",
    "min_engine_version": [1, 18, 3],
    "uuid": "021988b7-7641-49e8-a137-5136b008cfdf",
    "version": [1, 0, 0]
  },
  "modules": [
    {
      "description": "Data Module",
      "type": "data",
      "uuid": "42f85e78-263b-48ee-a0da-a39a5890d682",
      "version": [1, 0, 0]
    },
    {
      "description": "Gametest Module",
      "language": "javascript",
      "type": "script",
      "uuid": "cde6447c-aa7b-446c-b707-acec9033360f",
      "version": [0, 0, 1],
      "entry": "scripts/index.js"
    }
  ],
  "dependencies": [
    // mojang-minecraft module
    {
      "uuid": "6f4b6893-1bb6-42fd-b458-7fa3d0c89616",
      "version": [0, 1, 0]
    },
    {
      // mojang-gametest module
      "uuid": "6f4b6893-1bb6-42fd-b458-7fa3d0c89616",
      "version": [0, 1, 0]
    },
    {
      // mojang-minecraft-ui module
      "uuid": "2BD50A27-AB5F-4F40-A596-3641627C635E",
      "version": [0, 1, 0]
    }
  ],
  "metadata": {
    "authors": ["Bedrock Gametest"],
    "license": "MIT",
    "url": "https://discord.gg/3GvfCDdTqY."
  }
}
```
`manifest.json`

Types Installation
> **Mojang Minecraft Module**
> `npm install --save @types/mojang-minecraft`
> **Mojang Gametest Module**
> `npm install --save @types/mojang-gametest`

Source: https://www.npmjs.com/package/@types/mojang-gametest

`For Mobile or people without node`
https://cdn.discordapp.com/attachments/968289568157761586/968295372965425202/mojang-gametest.zip
https://cdn.discordapp.com/attachments/968289568157761586/968295373162577950/mojang-minecraft.zip

`/scripts/index.js`
```js
import { world } from "mojang-minecraft";

world.events.tick.subscribe((data) => {
  console.warn(`You have successfully set up a game test script!`);
});
```
`PREMADE PACKS WITH NODE_MODULES READY AND EVERYTHING SETUP READY TO GO`
https://cdn.discordapp.com/attachments/968289568157761586/968296032167424040/Gametest_Getting_Started.mcpack
https://cdn.discordapp.com/attachments/968289568157761586/968296032356139008/Gametest_Getting_Started.zip