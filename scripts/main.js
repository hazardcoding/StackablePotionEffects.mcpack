import { world } from "@minecraft/server";

// Define potion potion strengths (Amplifier 0 = Level I, 1 = Level II)
const POTION_AMPLIFIERS = {
  "minecraft:speed": 1, // Speed II potion adds 1 to amplifier (+2 levels)
  "minecraft:strength": 1,
  "minecraft:regeneration": 1,
  "minecraft:jump_boost": 1
};

world.afterEvents.itemCompleteUse.subscribe((event) => {
  const player = event.source;
  const item = event.itemStack;

  // Check if item is a potion
  if (item.typeId === "minecraft:potion" || item.typeId === "minecraft:splash_potion") {
    
    // Example for Speed
    const effectName = "speed";
    const currentEffect = player.getEffect(effectName);

    // Default duration (e.g., 3 minutes = 3600 ticks)
    const baseDurationTicks = 3600; 

    if (currentEffect) {
      // Current level + 2 levels (Amplifier increment)
      const newAmplifier = currentEffect.amplifier + 2; 

      player.addEffect(effectName, baseDurationTicks, {
        amplifier: newAmplifier,
        showParticles: true
      });
    } else {
      // If no effect active, grant Speed II (amplifier 1)
      player.addEffect(effectName, baseDurationTicks, {
        amplifier: 1,
        showParticles: true
      });
    }
  }
});
