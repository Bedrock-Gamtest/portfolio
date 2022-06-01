How to use

```js
const location = parseLocationAugs([args[0], args[1], args[2]], {
  location: [
    data.sender.location.x,
    data.sender.location.y,
    data.sender.location.z,
  ],
  viewVector: [
    data.sender.viewVector.x,
    data.sender.viewVector.y,
    data.sender.viewVector.z,
  ],
});
world.getDimension("overworld").spawnEntity("minecraft:sheep", location);
```
