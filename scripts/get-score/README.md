```js
getScore(Entity, "money"); // returns 0  or a value
getScore(Entity, 'Money'); // returns 0  or a value
getScore('Steve', 'Money'); // returns 0  or a value
getScore('@r[name="Steve"]', 'Money'); // returns 0  or a value
getScore('@"Steve XD"', 'Money'); // returns 0  or a value
```
