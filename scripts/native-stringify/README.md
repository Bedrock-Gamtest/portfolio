examples

```js
console.warn(native.stringify(world)); //returns stringified world object
world.events.tick(() => {
  [...world.getPlayers()].forEach((player) => {
    console.warn(native.stringify(player)); //returns stringified player object
  });
});
```
