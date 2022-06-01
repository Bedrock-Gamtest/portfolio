Minecraft Bedrock database, store unlimited items no storage limit and no memory wipes. Also stores data in memory so doesn't waste time grabbing information if nothing new has been saved

**How to create a table**

```js
import { Database } from "./index.js";

const table = new Database("test");
```

**Set values by simply**

```js
table.set("Smelly stinky", "Curryyy");
```

**Then you can grab those values right back by doing**

```js
table.get("Smelly stinky");
```
