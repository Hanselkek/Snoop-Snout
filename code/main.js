import kaboom from "kaboom"

kaboom({
  background: [45, 86, 235, 255]
})

loadSprite("bean", "sprites/bean.png")
loadSprite("coin", "sprites/coin.png")

loadSound("bell", "sounds/bell.mp3");

// Configs
const DEATH_TEXT = "You got all of them!";
let levelNumber = 1;
// Show the Source
function AddSource() {
  const sourceText = add([
    text("THIS GAME IS OPEN SOURCE: https://github.com/Hanselkek/Snoop-Snout"),
    scale(0.325),
    origin("center"),
    pos(500, 40),
  ])
}
// LEVEL 1
scene("game1", () => {
  let currentCoins = 6;

  AddSource();

  // Adding the player sprite
  const player = add([
    sprite("bean"),

    pos(25, 35),
    area(),
    body(),
  ])
  // Drawing the floor
  const platform = add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(4.5),
    area(),
    solid(),
    color(66, 135, 245),
  ])

  // Coins
  function spawn_coin(pos__) {
    add([
      sprite("coin"),

      pos(pos__),
      area(),
      solid(),
      "coin",
    ])
  }
  // Spawning
  spawn_coin(vec2(355, platform.pos.y - 43));
  spawn_coin(vec2(455, platform.pos.y - 43));
  spawn_coin(vec2(555, platform.pos.y - 43));
  spawn_coin(vec2(655, platform.pos.y - 43));
  spawn_coin(vec2(755, platform.pos.y - 43));
  spawn_coin(vec2(855, platform.pos.y - 43));

  // Making the player jump
  onKeyPress("space", () => {
    if (player.isGrounded())
      player.jump();
  })

  player.onCollide("coin", (collider) => {
    play("bell", { volume: 0.035 })
    currentCoins -= 1;
    destroy(collider);
  })

  onUpdate(() => {
    if (isKeyDown("a")) {
      player.move(-425, 0);
      player.flipX(true);
    }
    if (isKeyDown("d")) {
      player.move(425, 0);
      player.flipX(false);
    }

    if (currentCoins <= 0)
      go("dead");
  })
});
// Dead or Win Screen
scene("dead", () => {
  add([
    text(DEATH_TEXT),
    scale(0.75),
    origin("center"),
    pos(center()),

    wait(3.5, () => {
      go("game" + levelNumber);
    })
  ])
});

go("game" + levelNumber);