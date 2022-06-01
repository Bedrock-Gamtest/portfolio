world.events.playerJoin.subscribe((data) => {
  if (data.player.hasTag("old")) return;
  //player is new
  // add code here...
  data.player.addTag("old");
});
