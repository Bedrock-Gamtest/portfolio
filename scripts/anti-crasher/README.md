**You will also need to add a component group to your player.json**

```json
"binocraft:kick": {
  "minecraft:instant_despawn": {},
  "minecraft:explode": {}
}
```

**Then create a custom event in the player.json**

```json
"binocraft:kick": {
  "add": {
    "component_groups": ["binocraft:kick"]
  }
}
```
