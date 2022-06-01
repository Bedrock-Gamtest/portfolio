Random form I made

```js
const ac = new ActionForm();
ac.setTitle("§6§lHi!");
ac.setBody("§1§lWhatca doin'?");
ac.addButton("§a§lNothing...", "textures/r2");
ac.addButton("§c§lGo away!!!", "textures/r");
ac.send(chatmsg.sender.name, (res) => {
  if (res.isCanceled || res.selection === 1)
    return console.warn(
      "I just wanted to know how you day was going... §l§1;("
    );
  const bc = new MessageForm();
  bc.setTitle("§6§lDay?");
  bc.setBody("§1§lHows your day going?");
  bc.button1("§a§lGood!");
  bc.button2("§c§lBad!");
  bc.send(chatmsg.sender.name, (res) => {
    if (res.isCanceled || res.selection === 0)
      return console.warn("§l§4Sorry to hear man!");
    const dc = new ModalForm();
    dc.setTitle("§6§lTell me a bit more...");
    dc.addSlider("§9§lRate it 1-10", 1, 10, 1, 5);
    dc.addDropdown(
      "Today is the ___ day of my life!",
      ["best", "ehh", "worst"],
      1
    );
    dc.addInput("§a§lTell me the coolest thing that happen?", "§aType here!");
    dc.addInput("§4§lTell me the Worst thing that happen...", "§aType here!");
    dc.addToggle("Share with admins?", false);
    dc.send(chatmsg.sender.name);
  });
});
```
