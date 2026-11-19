export type SpriteInfo = {
  description: string
  hint: string
  rarity: string
  summonCost: number
}

export const SPRITE_INFO: Record<string, SpriteInfo> = {
  "LlamaSprite": {
    "description": "Opening ammo boxes has a chance to grant a weapon upgrade. Chance increases at each Level Up: 5% -> 10% -> 15% -> 17% -> 20% ",
    "hint": "Found in Relic Chests",
    "rarity": "Legendary",
    "summonCost": 5000
  },
  "LlamaSprite_Variant_A": {
    "description": "Opening ammo boxes has a chance to grant a weapon upgrade. Chance increases at each Level Up: 5% -> 10% -> 15% -> 17% -> 20% ",
    "hint": "Found in Relic Chests",
    "rarity": "Legendary",
    "summonCost": 5000
  },
  "LlamaSprite_Variant_Candy": {
    "description": "Opening ammo boxes has a chance to grant a weapon upgrade. Chance increases at each Level Up: 5% -> 10% -> 15% -> 17% -> 20% ",
    "hint": "Found in Relic Chests",
    "rarity": "Legendary",
    "summonCost": 10000
  },
  "LlamaSprite_Variant_Galaxy": {
    "description": "Opening ammo boxes has a chance to grant a weapon upgrade. Chance increases at each Level Up: 5% -> 10% -> 15% -> 17% -> 20% ",
    "hint": "Found in Relic Chests",
    "rarity": "Legendary",
    "summonCost": 10000
  },
  "LlamaSprite_Variant_Gem": {
    "description": "Opening ammo boxes has a chance to grant a weapon upgrade. Chance increases at each Level Up: 5% -> 10% -> 15% -> 17% -> 20% ",
    "hint": "Found in Relic Chests",
    "rarity": "Legendary",
    "summonCost": 10000
  },
  "LlamaSprite_Variant_Gold": {
    "description": "Opening ammo boxes has a chance to grant a weapon upgrade. Chance increases at each Level Up: 5% -> 10% -> 15% -> 17% -> 20% ",
    "hint": "Found in Relic Chests",
    "rarity": "Legendary",
    "summonCost": 10000
  },
  "DuckSprite": {
    "description": "Emoting or Jamming replenishes shields. Increases in power at each Level Up: 2 Shield -> 3 Shield -> 4 Shield -> 6 Shield -> 8 Shield per tick",
    "hint": "Found in the vault of a certain business mogul",
    "rarity": "Epic",
    "summonCost": 3000
  },
  "DuckSprite_Variant_A": {
    "description": "Emoting or Jamming replenishes shields. Increases in power at each Level Up: 2 Shield -> 3 Shield -> 4 Shield -> 6 Shield -> 8 Shield per tick",
    "hint": "Found in the vault of a certain business mogul",
    "rarity": "Epic",
    "summonCost": 3000
  },
  "DuckSprite_Variant_Candy": {
    "description": "Emoting or Jamming replenishes shields. Increases in power at each Level Up: 2 Shield -> 3 Shield -> 4 Shield -> 6 Shield -> 8 Shield per tick",
    "hint": "Found in the vault of a certain business mogul",
    "rarity": "Epic",
    "summonCost": 6000
  },
  "DuckSprite_Variant_Galaxy": {
    "description": "Emoting or Jamming replenishes shields. Increases in power at each Level Up: 2 Shield -> 3 Shield -> 4 Shield -> 6 Shield -> 8 Shield per tick",
    "hint": "Found in the vault of a certain business mogul",
    "rarity": "Epic",
    "summonCost": 6000
  },
  "DuckSprite_Variant_Gem": {
    "description": "Emoting or Jamming replenishes shields. Increases in power at each Level Up: 2 Shield -> 3 Shield -> 4 Shield -> 6 Shield -> 8 Shield per tick",
    "hint": "Found in the vault of a certain business mogul",
    "rarity": "Epic",
    "summonCost": 6000
  },
  "DuckSprite_Variant_Gold": {
    "description": "Emoting or Jamming replenishes shields. Increases in power at each Level Up: 2 Shield -> 3 Shield -> 4 Shield -> 6 Shield -> 8 Shield per tick",
    "hint": "Found in the vault of a certain business mogul",
    "rarity": "Epic",
    "summonCost": 6000
  },
  "GhostSprite": {
    "description": "Grants cloak for a duration upon reloading. Increases in duration at each Level Up: 3 Seconds -> 3.5 Seconds -> 4 Seconds -> 4.5 Seconds -> 5 Seconds",
    "hint": "Found in the world at nighttime",
    "rarity": "Epic",
    "summonCost": 3000
  },
  "GhostSprite_Variant_A": {
    "description": "Grants cloak for a duration upon reloading. Increases in duration at each Level Up: 3 Seconds -> 3.5 Seconds -> 4 Seconds -> 4.5 Seconds -> 5 Seconds",
    "hint": "Found in the world at nighttime",
    "rarity": "Epic",
    "summonCost": 3000
  },
  "GhostSprite_Variant_Candy": {
    "description": "Grants cloak for a duration upon reloading. Increases in duration at each Level Up: 3 Seconds -> 3.5 Seconds -> 4 Seconds -> 4.5 Seconds -> 5 Seconds",
    "hint": "Found in the world at nighttime",
    "rarity": "Epic",
    "summonCost": 6000
  },
  "GhostSprite_Variant_Galaxy": {
    "description": "Grants cloak for a duration upon reloading. Increases in duration at each Level Up: 3 Seconds -> 3.5 Seconds -> 4 Seconds -> 4.5 Seconds -> 5 Seconds",
    "hint": "Found in the world at nighttime",
    "rarity": "Epic",
    "summonCost": 6000
  },
  "GhostSprite_Variant_Gold": {
    "description": "Grants cloak for a duration upon reloading. Increases in duration at each Level Up: 3 Seconds -> 3.5 Seconds -> 4 Seconds -> 4.5 Seconds -> 5 Seconds",
    "hint": "Found in the world at nighttime",
    "rarity": "Epic",
    "summonCost": 6000
  },
  "GhostSprite_Variant_Holofoil": {
    "description": "Grants cloak for a duration upon reloading. Increases in duration at each Level Up: 3 Seconds -> 3.5 Seconds -> 4 Seconds -> 4.5 Seconds -> 5 Seconds",
    "hint": "Found in the world at nighttime",
    "rarity": "Epic",
    "summonCost": 6000
  },
  "SleepySprite": {
    "description": "Grants a random item at each level, exploding with legendary loot at Max Level. Loot value increases at each Level Up!",
    "hint": "Sometimes found sleeping in the storage crates",
    "rarity": "Legendary",
    "summonCost": 5000
  },
  "SleepySprite_Variant_A": {
    "description": "Grants a random item at each level, exploding with legendary loot at Max Level. Loot value increases at each Level Up!",
    "hint": "Sometimes found sleeping in the storage crates",
    "rarity": "Legendary",
    "summonCost": 5000
  },
  "SleepySprite_Variant_Candy": {
    "description": "Grants a random item at each level, exploding with legendary loot at Max Level. Loot value increases at each Level Up!",
    "hint": "Sometimes found sleeping in the storage crates",
    "rarity": "Legendary",
    "summonCost": 10000
  },
  "SleepySprite_Variant_Cube": {
    "description": "Grants a random item at each level, exploding with legendary loot at Max Level. Loot value increases at each Level Up!",
    "hint": "Sometimes found sleeping in the storage crates",
    "rarity": "Legendary",
    "summonCost": 10000
  },
  "SleepySprite_Variant_Galactic": {
    "description": "Grants a random item at each level, exploding with legendary loot at Max Level. Loot value increases at each Level Up!",
    "hint": "Sometimes found sleeping in the storage crates",
    "rarity": "Legendary",
    "summonCost": 10000
  },
  "SleepySprite_Variant_Gold": {
    "description": "Grants a random item at each level, exploding with legendary loot at Max Level. Loot value increases at each Level Up!",
    "hint": "Sometimes found sleeping in the storage crates",
    "rarity": "Legendary",
    "summonCost": 10000
  },
  "KingSprite": {
    "description": "Your Pickaxe deals more damage. Increases in damage at each Level Up: 30 -> 40 -> 60 -> 80 -> 120 bonus damage",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Epic",
    "summonCost": 3000
  },
  "KingSprite_Variant_A": {
    "description": "Your Pickaxe deals more damage. Increases in damage at each Level Up: 30 -> 40 -> 60 -> 80 -> 120 bonus damage",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Epic",
    "summonCost": 3000
  },
  "KingSprite_Variant_Candy": {
    "description": "Your Pickaxe deals more damage. Increases in damage at each Level Up: 30 -> 40 -> 60 -> 80 -> 120 bonus damage",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Epic",
    "summonCost": 6000
  },
  "KingSprite_Variant_Galaxy": {
    "description": "Your Pickaxe deals more damage. Increases in damage at each Level Up: 30 -> 40 -> 60 -> 80 -> 120 bonus damage",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Epic",
    "summonCost": 6000
  },
  "KingSprite_Variant_Gold": {
    "description": "Your Pickaxe deals more damage. Increases in damage at each Level Up: 30 -> 40 -> 60 -> 80 -> 120 bonus damage",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Epic",
    "summonCost": 6000
  },
  "KingSprite_Variant_Holofoil": {
    "description": "Your Pickaxe deals more damage. Increases in damage at each Level Up: 30 -> 40 -> 60 -> 80 -> 120 bonus damage",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Epic",
    "summonCost": 6000
  },
  "DemonSprite": {
    "description": "Siphon some health and shields when you eliminate an opponent. Increases in power at each Level Up: 10 Healing -> 15 Healing -> 20 Healing -> 25 Healing -> 30 Healing per elimination",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Epic",
    "summonCost": 3000
  },
  "DemonSprite_Variant_A": {
    "description": "Siphon some health and shields when you eliminate an opponent. Increases in power at each Level Up: 10 Healing -> 15 Healing -> 20 Healing -> 25 Healing -> 30 Healing per elimination",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Epic",
    "summonCost": 3000
  },
  "DemonSprite_Variant_Candy": {
    "description": "Siphon some health and shields when you eliminate an opponent. Increases in power at each Level Up: 10 Healing -> 15 Healing -> 20 Healing -> 25 Healing -> 30 Healing per elimination",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Epic",
    "summonCost": 6000
  },
  "DemonSprite_Variant_Galaxy": {
    "description": "Siphon some health and shields when you eliminate an opponent. Increases in power at each Level Up: 10 Healing -> 15 Healing -> 20 Healing -> 25 Healing -> 30 Healing per elimination",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Epic",
    "summonCost": 6000
  },
  "DemonSprite_Variant_Gem": {
    "description": "Siphon some health and shields when you eliminate an opponent. Increases in power at each Level Up: 10 Healing -> 15 Healing -> 20 Healing -> 25 Healing -> 30 Healing per elimination",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Epic",
    "summonCost": 6000
  },
  "DemonSprite_Variant_Gold": {
    "description": "Siphon some health and shields when you eliminate an opponent. Increases in power at each Level Up: 10 Healing -> 15 Healing -> 20 Healing -> 25 Healing -> 30 Healing per elimination",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Epic",
    "summonCost": 6000
  },
  "BurntPeanut": {
    "description": "Goop! When eliminating players, you may find more loot. Sometimes mythic! Chance increases at each Level Up: 20% -> 30% -> 40% -> 50% -> 60% chance to find more loot. 10% chance to find Mythic at Max Level!",
    "hint": "Found in Relic Chests",
    "rarity": "Mythic",
    "summonCost": 7500
  },
  "BurntPeanut_Variation_A": {
    "description": "Goop! When eliminating players, you may find more loot. Sometimes mythic! Chance increases at each Level Up: 20% -> 30% -> 40% -> 50% -> 60% chance to find more loot. 10% chance to find Mythic at Max Level!",
    "hint": "Found in Relic Chests",
    "rarity": "Mythic",
    "summonCost": 7500
  },
  "BossSprite": {
    "description": "Grants an increase to your max HP and Shield. Increases at each Level Up: 5 HP/Shield -> 10 HP/Shield -> 15 HP/Shield -> 20 HP/Shield -> 25 HP/Shield",
    "hint": "Claimed from defeating a powerful adversary",
    "rarity": "Legendary",
    "summonCost": 5000
  },
  "BossSprite_Variant_A": {
    "description": "Grants an increase to your max HP and Shield. Increases at each Level Up: 5 HP/Shield -> 10 HP/Shield -> 15 HP/Shield -> 20 HP/Shield -> 25 HP/Shield",
    "hint": "Claimed from defeating a powerful adversary",
    "rarity": "Legendary",
    "summonCost": 5000
  },
  "BossSprite_Variant_Candy": {
    "description": "Grants an increase to your max HP and Shield. Increases at each Level Up: 5 HP/Shield -> 10 HP/Shield -> 15 HP/Shield -> 20 HP/Shield -> 25 HP/Shield",
    "hint": "Claimed from defeating a powerful adversary",
    "rarity": "Legendary",
    "summonCost": 10000
  },
  "BossSprite_Variant_Cube": {
    "description": "Grants an increase to your max HP and Shield. Increases at each Level Up: 5 HP/Shield -> 10 HP/Shield -> 15 HP/Shield -> 20 HP/Shield -> 25 HP/Shield",
    "hint": "Claimed from defeating a powerful adversary",
    "rarity": "Legendary",
    "summonCost": 10000
  },
  "BossSprite_Variant_Galaxy": {
    "description": "Grants an increase to your max HP and Shield. Increases at each Level Up: 5 HP/Shield -> 10 HP/Shield -> 15 HP/Shield -> 20 HP/Shield -> 25 HP/Shield",
    "hint": "Claimed from defeating a powerful adversary",
    "rarity": "Legendary",
    "summonCost": 10000
  },
  "BossSprite_Variant_Gold": {
    "description": "Grants an increase to your max HP and Shield. Increases at each Level Up: 5 HP/Shield -> 10 HP/Shield -> 15 HP/Shield -> 20 HP/Shield -> 25 HP/Shield",
    "hint": "Claimed from defeating a powerful adversary",
    "rarity": "Legendary",
    "summonCost": 10000
  },
  "SevenSprite": {
    "description": "Enemy player foot trails are visible in the world for your Squad. Duration increases at each Level Up: 10 Seconds -> 15 Seconds -> 20 Seconds -> 25 Seconds -> 30 Second foot trails",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Legendary",
    "summonCost": 5000
  },
  "SevenSprite_Variant_A": {
    "description": "Enemy player foot trails are visible in the world for your Squad. Duration increases at each Level Up: 10 Seconds -> 15 Seconds -> 20 Seconds -> 25 Seconds -> 30 Second foot trails",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Legendary",
    "summonCost": 5000
  },
  "SevenSprite_Variant_Candy": {
    "description": "Enemy player foot trails are visible in the world for your Squad. Duration increases at each Level Up: 10 Seconds -> 15 Seconds -> 20 Seconds -> 25 Seconds -> 30 Second foot trails",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Legendary",
    "summonCost": 10000
  },
  "SevenSprite_Variant_Galaxy": {
    "description": "Enemy player foot trails are visible in the world for your Squad. Duration increases at each Level Up: 10 Seconds -> 15 Seconds -> 20 Seconds -> 25 Seconds -> 30 Second foot trails",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Legendary",
    "summonCost": 10000
  },
  "SevenSprite_Variant_Gold": {
    "description": "Enemy player foot trails are visible in the world for your Squad. Duration increases at each Level Up: 10 Seconds -> 15 Seconds -> 20 Seconds -> 25 Seconds -> 30 Second foot trails",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Legendary",
    "summonCost": 10000
  },
  "SevenSprite_Variant_Holofoil": {
    "description": "Enemy player foot trails are visible in the world for your Squad. Duration increases at each Level Up: 10 Seconds -> 15 Seconds -> 20 Seconds -> 25 Seconds -> 30 Second foot trails",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Legendary",
    "summonCost": 10000
  },
  "FishySprite": {
    "description": "Swim speed greatly increased. Taking damage also briefly increases movement speed. Increases in power at each Level Up: 25% Swim Speed / 10% Movement Speed -> 50% Swim Speed / 20% Movement Speed -> 100% Swim Speed / 30% Movement Speed -> 150% Swim Speed / 40% Movement Speed -> 200% Swim Speed / 50% Movement Speed Bonuses",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 2000
  },
  "FishySprite_Variant_A": {
    "description": "Swim speed greatly increased. Taking damage also briefly increases movement speed. Increases in power at each Level Up: 25% Swim Speed / 10% Movement Speed -> 50% Swim Speed / 20% Movement Speed -> 100% Swim Speed / 30% Movement Speed -> 150% Swim Speed / 40% Movement Speed -> 200% Swim Speed / 50% Movement Speed Bonuses",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 2000
  },
  "FishySprite_Variant_Candy": {
    "description": "Swim speed greatly increased. Taking damage also briefly increases movement speed. Increases in power at each Level Up: 25% Swim Speed / 10% Movement Speed -> 50% Swim Speed / 20% Movement Speed -> 100% Swim Speed / 30% Movement Speed -> 150% Swim Speed / 40% Movement Speed -> 200% Swim Speed / 50% Movement Speed Bonuses",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 4000
  },
  "FishySprite_Variant_Cube": {
    "description": "Swim speed greatly increased. Taking damage also briefly increases movement speed. Increases in power at each Level Up: 25% Swim Speed / 10% Movement Speed -> 50% Swim Speed / 20% Movement Speed -> 100% Swim Speed / 30% Movement Speed -> 150% Swim Speed / 40% Movement Speed -> 200% Swim Speed / 50% Movement Speed Bonuses",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 4000
  },
  "FishySprite_Variant_Galaxy": {
    "description": "Swim speed greatly increased. Taking damage also briefly increases movement speed. Increases in power at each Level Up: 25% Swim Speed / 10% Movement Speed -> 50% Swim Speed / 20% Movement Speed -> 100% Swim Speed / 30% Movement Speed -> 150% Swim Speed / 40% Movement Speed -> 200% Swim Speed / 50% Movement Speed Bonuses",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 4000
  },
  "FishySprite_Variant_Gold": {
    "description": "Swim speed greatly increased. Taking damage also briefly increases movement speed. Increases in power at each Level Up: 25% Swim Speed / 10% Movement Speed -> 50% Swim Speed / 20% Movement Speed -> 100% Swim Speed / 30% Movement Speed -> 150% Swim Speed / 40% Movement Speed -> 200% Swim Speed / 50% Movement Speed Bonuses",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 4000
  },
  "SoccerSprite": {
    "description": "Gain the Overdrive effect when you Mantle, Hurdle, or Wall Scramble. Duration increases at each Level Up: 6 Seconds -> 7 Seconds -> 8 Seconds -> 9 Seconds -> 10 Seconds of Overdrive",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 3000
  },
  "SoccerSprite_Variant_A": {
    "description": "Gain the Overdrive effect when you Mantle, Hurdle, or Wall Scramble. Duration increases at each Level Up: 6 Seconds -> 7 Seconds -> 8 Seconds -> 9 Seconds -> 10 Seconds of Overdrive",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 3000
  },
  "SoccerSprite_Variant_Candy": {
    "description": "Gain the Overdrive effect when you Mantle, Hurdle, or Wall Scramble. Duration increases at each Level Up: 6 Seconds -> 7 Seconds -> 8 Seconds -> 9 Seconds -> 10 Seconds of Overdrive",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 6000
  },
  "SoccerSprite_Variant_Galaxy": {
    "description": "Gain the Overdrive effect when you Mantle, Hurdle, or Wall Scramble. Duration increases at each Level Up: 6 Seconds -> 7 Seconds -> 8 Seconds -> 9 Seconds -> 10 Seconds of Overdrive",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 6000
  },
  "SoccerSprite_Variant_Gold": {
    "description": "Gain the Overdrive effect when you Mantle, Hurdle, or Wall Scramble. Duration increases at each Level Up: 6 Seconds -> 7 Seconds -> 8 Seconds -> 9 Seconds -> 10 Seconds of Overdrive",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 6000
  },
  "SoccerSprite_Variant_Holofoil": {
    "description": "Gain the Overdrive effect when you Mantle, Hurdle, or Wall Scramble. Duration increases at each Level Up: 6 Seconds -> 7 Seconds -> 8 Seconds -> 9 Seconds -> 10 Seconds of Overdrive",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 6000
  },
  "DrifterSprite": {
    "description": "Gain a Shock Rock charge when you deal enough damage to enemies! Required damage decreases at each Level Up: 175 Damage -> 150 Damage -> 125 Damage -> 100 Damage -> 75 Damage to trigger",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 3000
  },
  "DrifterSprite_Variant_A": {
    "description": "Gain a Shock Rock charge when you deal enough damage to enemies! Required damage decreases at each Level Up: 175 Damage -> 150 Damage -> 125 Damage -> 100 Damage -> 75 Damage to trigger",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 3000
  },
  "DrifterSprite_Variant_Candy": {
    "description": "Gain a Shock Rock charge when you deal enough damage to enemies! Required damage decreases at each Level Up: 175 Damage -> 150 Damage -> 125 Damage -> 100 Damage -> 75 Damage to trigger",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 6000
  },
  "DrifterSprite_Variant_Galaxy": {
    "description": "Gain a Shock Rock charge when you deal enough damage to enemies! Required damage decreases at each Level Up: 175 Damage -> 150 Damage -> 125 Damage -> 100 Damage -> 75 Damage to trigger",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 6000
  },
  "DrifterSprite_Variant_Gem": {
    "description": "Gain a Shock Rock charge when you deal enough damage to enemies! Required damage decreases at each Level Up: 175 Damage -> 150 Damage -> 125 Damage -> 100 Damage -> 75 Damage to trigger",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 6000
  },
  "DrifterSprite_Variant_Gold": {
    "description": "Gain a Shock Rock charge when you deal enough damage to enemies! Required damage decreases at each Level Up: 175 Damage -> 150 Damage -> 125 Damage -> 100 Damage -> 75 Damage to trigger",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 6000
  },
  "AirSprite": {
    "description": "Increases sprinting speed and sprinting jump height. Also nullifies fall damage. Jump height increased with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 2000
  },
  "AirSprite_Variant_A": {
    "description": "Increases sprinting speed and sprinting jump height. Also nullifies fall damage. Jump height increased with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 2000
  },
  "AirSprite_Variant_Candy": {
    "description": "Increases sprinting speed and sprinting jump height. Also nullifies fall damage. Jump height increased with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 4000
  },
  "AirSprite_Variant_Galaxy": {
    "description": "Increases sprinting speed and sprinting jump height. Also nullifies fall damage. Jump height increased with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 4000
  },
  "AirSprite_Variant_Gold": {
    "description": "Increases sprinting speed and sprinting jump height. Also nullifies fall damage. Jump height increased with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 4000
  },
  "AirSprite_Variant_Holofoil": {
    "description": "Increases sprinting speed and sprinting jump height. Also nullifies fall damage. Jump height increased with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 4000
  },
  "Water": {
    "description": "Replenish shields while standing in water! Increases in power at each Level Up: 2 Shield -> 3 Shield -> 4 Shield -> 5 Shield -> 6 Shield per tick",
    "hint": "Spotted near rivers and beaches",
    "rarity": "Rare",
    "summonCost": 100
  },
  "Water_Variant_Base": {
    "description": "Replenish shields while standing in water! Increases in power at each Level Up: 2 Shield -> 3 Shield -> 4 Shield -> 5 Shield -> 6 Shield per tick",
    "hint": "Spotted near rivers and beaches",
    "rarity": "Rare",
    "summonCost": 100
  },
  "Water_Variant_Candy": {
    "description": "Replenish shields while standing in water! Increases in power at each Level Up: 2 Shield -> 3 Shield -> 4 Shield -> 5 Shield -> 6 Shield per tick",
    "hint": "Spotted near rivers and beaches",
    "rarity": "Rare",
    "summonCost": 4000
  },
  "Water_Variant_Galaxy": {
    "description": "Replenish shields while standing in water! Increases in power at each Level Up: 2 Shield -> 3 Shield -> 4 Shield -> 5 Shield -> 6 Shield per tick",
    "hint": "Spotted near rivers and beaches",
    "rarity": "Rare",
    "summonCost": 4000
  },
  "Water_Variant_Gem": {
    "description": "Replenish shields while standing in water! Increases in power at each Level Up: 2 Shield -> 3 Shield -> 4 Shield -> 5 Shield -> 6 Shield per tick",
    "hint": "Spotted near rivers and beaches",
    "rarity": "Rare",
    "summonCost": 4000
  },
  "Water_Variant_Gold": {
    "description": "Replenish shields while standing in water! Increases in power at each Level Up: 2 Shield -> 3 Shield -> 4 Shield -> 5 Shield -> 6 Shield per tick",
    "hint": "Spotted near rivers and beaches",
    "rarity": "Rare",
    "summonCost": 4000
  },
  "Water_Variant_Holofoil": {
    "description": "Replenish shields while standing in water! Increases in power at each Level Up: 2 Shield -> 3 Shield -> 4 Shield -> 5 Shield -> 6 Shield per tick",
    "hint": "Spotted near rivers and beaches",
    "rarity": "Rare",
    "summonCost": 4000
  },
  "Water_Variant_Quack": {
    "description": "Replenish shields while standing in water! Increases in power at each Level Up: 2 Shield -> 3 Shield -> 4 Shield -> 5 Shield -> 6 Shield per tick",
    "hint": "Spotted near rivers and beaches",
    "rarity": "Rare",
    "summonCost": 4000
  },
  "PedicureAntacidSprite": {
    "description": " Regenerate health over time when low. While regenerating, gain Cloak and low gravity! Health regenerated to increases at each Level Up: 60 Health -> 70 Health -> 80 Health -> 90 Health -> 100 Health",
    "hint": "Found in Relic Chests",
    "rarity": "Mythic",
    "summonCost": 7500
  },
  "PedicureAntacidSprite_Variant_A": {
    "description": " Regenerate health over time when low. While regenerating, gain Cloak and low gravity! Health regenerated to increases at each Level Up: 60 Health -> 70 Health -> 80 Health -> 90 Health -> 100 Health",
    "hint": "Found in Relic Chests",
    "rarity": "Mythic",
    "summonCost": 7500
  },
  "FossilMealSprite": {
    "description": "Grants the ability to deploy the Bat Cape midair!",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Mythic",
    "summonCost": 7500
  },
  "FossilMealSprite_Variant_A": {
    "description": "Grants the ability to deploy the Bat Cape midair!",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Mythic",
    "summonCost": 7500
  },
  "FossilMealSprite_Variant_Candy": {
    "description": "Grants the ability to deploy the Bat Cape midair!",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Mythic",
    "summonCost": 15000
  },
  "FossilMealSprite_Variant_Cube": {
    "description": "Grants the ability to deploy the Bat Cape midair!",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Mythic",
    "summonCost": 15000
  },
  "FossilMealSprite_Variant_Galaxy": {
    "description": "Grants the ability to deploy the Bat Cape midair!",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Mythic",
    "summonCost": 15000
  },
  "FossilMealSprite_Variant_Gold": {
    "description": "Grants the ability to deploy the Bat Cape midair!",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Mythic",
    "summonCost": 15000
  },
  "FossilMealSprite_Variant_Holofoil": {
    "description": "Grants the ability to deploy the Bat Cape midair!",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Mythic",
    "summonCost": 15000
  },
  "FillerGruntSprite": {
    "description": "Knocking players reveals others nearby. Mark duration increases at each Level Up: 3 Seconds -> 3.5 Seconds -> 4 Seconds -> 4.5 Seconds -> 5 Seconds",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Mythic",
    "summonCost": 7500
  },
  "FillerGruntSprite_Variant_A": {
    "description": "Knocking players reveals others nearby. Mark duration increases at each Level Up: 3 Seconds -> 3.5 Seconds -> 4 Seconds -> 4.5 Seconds -> 5 Seconds",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Mythic",
    "summonCost": 7500
  },
  "CokeParmesanSprite": {
    "description": "Sprinting for a short time makes your slide destructive. Slidekicking enemies increases rate of fire and reload speed. Increases in power at each Level Up: 40 dmg / 10% fire rate -> 45 dmg / 20% fire rate -> 50 dmg / 30% fire rate -> 55 dmg / 40% fire rate -> 60 dmg / 50% fire rate",
    "hint": "Found in Relic Chests",
    "rarity": "Mythic",
    "summonCost": 7500
  },
  "CokeParmesan_Variant_A": {
    "description": "Sprinting for a short time makes your slide destructive. Slidekicking enemies increases rate of fire and reload speed. Increases in power at each Level Up: 40 dmg / 10% fire rate -> 45 dmg / 20% fire rate -> 50 dmg / 30% fire rate -> 55 dmg / 40% fire rate -> 60 dmg / 50% fire rate",
    "hint": "Found in Relic Chests",
    "rarity": "Mythic",
    "summonCost": 7500
  },
  "PeelySprite": {
    "description": "Emits a ping for players with rare sprites nearby, but marks you on the map. Ping radius increases at each Level Up: 40m -> 50m -> 60m -> 70m -> 80m ",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Legendary",
    "summonCost": 7500
  },
  "PeelySprite_Variant_A": {
    "description": "Emits a ping for players with rare sprites nearby, but marks you on the map. Ping radius increases at each Level Up: 40m -> 50m -> 60m -> 70m -> 80m ",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Legendary",
    "summonCost": 7500
  },
  "PeelySprite_Variant_Candy": {
    "description": "Emits a ping for players with rare sprites nearby, but marks you on the map. Ping radius increases at each Level Up: 40m -> 50m -> 60m -> 70m -> 80m ",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Legendary",
    "summonCost": 10000
  },
  "PeelySprite_Variant_Galaxy": {
    "description": "Emits a ping for players with rare sprites nearby, but marks you on the map. Ping radius increases at each Level Up: 40m -> 50m -> 60m -> 70m -> 80m ",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Legendary",
    "summonCost": 10000
  },
  "PeelySprite_Variant_Gold": {
    "description": "Emits a ping for players with rare sprites nearby, but marks you on the map. Ping radius increases at each Level Up: 40m -> 50m -> 60m -> 70m -> 80m ",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Legendary",
    "summonCost": 10000
  },
  "PeelySprite_Variant_Holofoil": {
    "description": "Emits a ping for players with rare sprites nearby, but marks you on the map. Ping radius increases at each Level Up: 40m -> 50m -> 60m -> 70m -> 80m ",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Legendary",
    "summonCost": 10000
  },
  "CompanyStargazer": {
    "description": "Upon earning an elimination, slowly replenish shield for you and nearby squad members for a duration. Duration increases at each Level Up: 6 Seconds -> 7 Seconds -> 8 Seconds -> 9 Seconds -> 10 Seconds ",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 7500
  },
  "CompanyStargazer_Variant_A": {
    "description": "Upon earning an elimination, slowly replenish shield for you and nearby squad members for a duration. Duration increases at each Level Up: 6 Seconds -> 7 Seconds -> 8 Seconds -> 9 Seconds -> 10 Seconds ",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 7500
  },
  "EarthSprite": {
    "description": "You have a chance to find additional rare items when opening chests. Chance increases at each Level Up: 10% -> 12.5% -> 15% -> 17.5% -> 20% chance to find additional rare loot",
    "hint": "Found wandering around forests and wooded regions",
    "rarity": "Rare",
    "summonCost": 100
  },
  "EarthSprite_Variant_A": {
    "description": "You have a chance to find additional rare items when opening chests. Chance increases at each Level Up: 10% -> 12.5% -> 15% -> 17.5% -> 20% chance to find additional rare loot",
    "hint": "Found wandering around forests and wooded regions",
    "rarity": "Rare",
    "summonCost": 100
  },
  "EarthSprite_Variant_Candy": {
    "description": "You have a chance to find additional rare items when opening chests. Chance increases at each Level Up: 10% -> 12.5% -> 15% -> 17.5% -> 20% chance to find additional rare loot",
    "hint": "Found wandering around forests and wooded regions",
    "rarity": "Rare",
    "summonCost": 4000
  },
  "EarthSprite_Variant_Cube": {
    "description": "You have a chance to find additional rare items when opening chests. Chance increases at each Level Up: 10% -> 12.5% -> 15% -> 17.5% -> 20% chance to find additional rare loot",
    "hint": "Found wandering around forests and wooded regions",
    "rarity": "Rare",
    "summonCost": 4000
  },
  "EarthSprite_Variant_Galaxy": {
    "description": "You have a chance to find additional rare items when opening chests. Chance increases at each Level Up: 10% -> 12.5% -> 15% -> 17.5% -> 20% chance to find additional rare loot",
    "hint": "Found wandering around forests and wooded regions",
    "rarity": "Rare",
    "summonCost": 4000
  },
  "EarthSprite_Variant_Gem": {
    "description": "You have a chance to find additional rare items when opening chests. Chance increases at each Level Up: 10% -> 12.5% -> 15% -> 17.5% -> 20% chance to find additional rare loot",
    "hint": "Found wandering around forests and wooded regions",
    "rarity": "Rare",
    "summonCost": 4000
  },
  "EarthSprite_Variant_Gold": {
    "description": "You have a chance to find additional rare items when opening chests. Chance increases at each Level Up: 10% -> 12.5% -> 15% -> 17.5% -> 20% chance to find additional rare loot",
    "hint": "Found wandering around forests and wooded regions",
    "rarity": "Rare",
    "summonCost": 4000
  },
  "EarthSprite_Variant_Quack": {
    "description": "You have a chance to find additional rare items when opening chests. Chance increases at each Level Up: 10% -> 12.5% -> 15% -> 17.5% -> 20% chance to find additional rare loot",
    "hint": "Found wandering around forests and wooded regions",
    "rarity": "Rare",
    "summonCost": 4000
  },
  "Spitfire": {
    "description": "Creates a fiery burst when you deal enough damage to an enemy! Required damage decreases at each Level Up: 150 Damage -> 125 Damage -> 100 Damage -> 75 Damage -> 50 Damage to trigger",
    "hint": "Located near urban areas",
    "rarity": "Rare",
    "summonCost": 100
  },
  "Spitfire_Variation_A": {
    "description": "Creates a fiery burst when you deal enough damage to an enemy! Required damage decreases at each Level Up: 150 Damage -> 125 Damage -> 100 Damage -> 75 Damage -> 50 Damage to trigger",
    "hint": "Located near urban areas",
    "rarity": "Rare",
    "summonCost": 100
  },
  "Spitfire_Variation_Candy": {
    "description": "Creates a fiery burst when you deal enough damage to an enemy! Required damage decreases at each Level Up: 150 Damage -> 125 Damage -> 100 Damage -> 75 Damage -> 50 Damage to trigger",
    "hint": "Located near urban areas",
    "rarity": "Rare",
    "summonCost": 4000
  },
  "Spitfire_Variation_Cube": {
    "description": "Creates a fiery burst when you deal enough damage to an enemy! Required damage decreases at each Level Up: 150 Damage -> 125 Damage -> 100 Damage -> 75 Damage -> 50 Damage to trigger",
    "hint": "Located near urban areas",
    "rarity": "Rare",
    "summonCost": 4000
  },
  "Spitfire_Variation_Galaxy": {
    "description": "Creates a fiery burst when you deal enough damage to an enemy! Required damage decreases at each Level Up: 150 Damage -> 125 Damage -> 100 Damage -> 75 Damage -> 50 Damage to trigger",
    "hint": "Located near urban areas",
    "rarity": "Rare",
    "summonCost": 4000
  },
  "Spitfire_Variation_Gold": {
    "description": "Creates a fiery burst when you deal enough damage to an enemy! Required damage decreases at each Level Up: 150 Damage -> 125 Damage -> 100 Damage -> 75 Damage -> 50 Damage to trigger",
    "hint": "Located near urban areas",
    "rarity": "Rare",
    "summonCost": 4000
  },
  "Spitfire_Variation_Holofoil": {
    "description": "Creates a fiery burst when you deal enough damage to an enemy! Required damage decreases at each Level Up: 150 Damage -> 125 Damage -> 100 Damage -> 75 Damage -> 50 Damage to trigger",
    "hint": "Located near urban areas",
    "rarity": "Rare",
    "summonCost": 4000
  },
  "Spitfire_Variation_Quack": {
    "description": "Creates a fiery burst when you deal enough damage to an enemy! Required damage decreases at each Level Up: 150 Damage -> 125 Damage -> 100 Damage -> 75 Damage -> 50 Damage to trigger",
    "hint": "Located near urban areas",
    "rarity": "Rare",
    "summonCost": 4000
  },
  "PunkSprite": {
    "description": "Possibly nothing... or infinitely something",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Legendary",
    "summonCost": 5000
  },
  "PunkSprite_Variant_A": {
    "description": "Possibly nothing... or infinitely something",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Legendary",
    "summonCost": 5000
  },
  "PunkSprite_Variant_Candy": {
    "description": "Possibly nothing... or infinitely something",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Legendary",
    "summonCost": 10000
  },
  "PunkSprite_Variant_Cube": {
    "description": "Possibly nothing... or infinitely something",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Legendary",
    "summonCost": 10000
  },
  "PunkSprite_Variant_Galaxy": {
    "description": "Possibly nothing... or infinitely something",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Legendary",
    "summonCost": 10000
  },
  "PunkSprite_Variant_Gold": {
    "description": "Possibly nothing... or infinitely something",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Legendary",
    "summonCost": 10000
  },
  "GrimSprite": {
    "description": "Players who attack you are marked for a duration. Increases in duration at each Level Up: 3 Seconds -> 3.5 Seconds -> 4 Seconds -> 4.5 Seconds -> 5 Seconds",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Mythic",
    "summonCost": 7500
  },
  "GrimSprite_Variant_A": {
    "description": "Players who attack you are marked for a duration. Increases in duration at each Level Up: 3 Seconds -> 3.5 Seconds -> 4 Seconds -> 4.5 Seconds -> 5 Seconds",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Mythic",
    "summonCost": 7500
  },
  "GrimSprite_Variant_Candy": {
    "description": "Players who attack you are marked for a duration. Increases in duration at each Level Up: 3 Seconds -> 3.5 Seconds -> 4 Seconds -> 4.5 Seconds -> 5 Seconds",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Mythic",
    "summonCost": 15000
  },
  "GrimSprite_Variant_Cube": {
    "description": "Players who attack you are marked for a duration. Increases in duration at each Level Up: 3 Seconds -> 3.5 Seconds -> 4 Seconds -> 4.5 Seconds -> 5 Seconds",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Mythic",
    "summonCost": 15000
  },
  "GrimSprite_Variant_Galaxy": {
    "description": "Players who attack you are marked for a duration. Increases in duration at each Level Up: 3 Seconds -> 3.5 Seconds -> 4 Seconds -> 4.5 Seconds -> 5 Seconds",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Mythic",
    "summonCost": 15000
  },
  "GrimSprite_Variant_Gem": {
    "description": "Players who attack you are marked for a duration. Increases in duration at each Level Up: 3 Seconds -> 3.5 Seconds -> 4 Seconds -> 4.5 Seconds -> 5 Seconds",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Mythic",
    "summonCost": 15000
  },
  "GrimSprite_Variant_Gold": {
    "description": "Players who attack you are marked for a duration. Increases in duration at each Level Up: 3 Seconds -> 3.5 Seconds -> 4 Seconds -> 4.5 Seconds -> 5 Seconds",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Mythic",
    "summonCost": 15000
  },
  "GrimSprite_Variant_Holofoil": {
    "description": "Players who attack you are marked for a duration. Increases in duration at each Level Up: 3 Seconds -> 3.5 Seconds -> 4 Seconds -> 4.5 Seconds -> 5 Seconds",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Mythic",
    "summonCost": 15000
  },
  "ZeroPointSprite": {
    "description": "Spawn a Shield Bubble Jr. when you use a healing item on yourself (excluding splashes and grenades). Increases in duration at each Level Up: 6 Seconds -> 7 Seconds -> 8 Seconds -> 9 Seconds -> 10 Seconds",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Mythic",
    "summonCost": 7500
  },
  "ZeroPointSprite_Variant_A": {
    "description": "Spawn a Shield Bubble Jr. when you use a healing item on yourself (excluding splashes and grenades). Increases in duration at each Level Up: 6 Seconds -> 7 Seconds -> 8 Seconds -> 9 Seconds -> 10 Seconds",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Mythic",
    "summonCost": 7500
  },
  "ZeroPointSprite_Variant_Candy": {
    "description": "Spawn a Shield Bubble Jr. when you use a healing item on yourself (excluding splashes and grenades). Increases in duration at each Level Up: 6 Seconds -> 7 Seconds -> 8 Seconds -> 9 Seconds -> 10 Seconds",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Mythic",
    "summonCost": 15000
  },
  "ZeroPointSprite_Variant_Cube": {
    "description": "Spawn a Shield Bubble Jr. when you use a healing item on yourself (excluding splashes and grenades). Increases in duration at each Level Up: 6 Seconds -> 7 Seconds -> 8 Seconds -> 9 Seconds -> 10 Seconds",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Mythic",
    "summonCost": 15000
  },
  "ZeroPointSprite_Variant_Galaxy": {
    "description": "Spawn a Shield Bubble Jr. when you use a healing item on yourself (excluding splashes and grenades). Increases in duration at each Level Up: 6 Seconds -> 7 Seconds -> 8 Seconds -> 9 Seconds -> 10 Seconds",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Mythic",
    "summonCost": 15000
  },
  "ZeroPointSprite_Variant_Gem": {
    "description": "Spawn a Shield Bubble Jr. when you use a healing item on yourself (excluding splashes and grenades). Increases in duration at each Level Up: 6 Seconds -> 7 Seconds -> 8 Seconds -> 9 Seconds -> 10 Seconds",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Mythic",
    "summonCost": 15000
  },
  "ZeroPointSprite_Variant_Gold": {
    "description": "Spawn a Shield Bubble Jr. when you use a healing item on yourself (excluding splashes and grenades). Increases in duration at each Level Up: 6 Seconds -> 7 Seconds -> 8 Seconds -> 9 Seconds -> 10 Seconds",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Mythic",
    "summonCost": 15000
  },
  "ZeroPointSprite_Variant_Holofoil": {
    "description": "Spawn a Shield Bubble Jr. when you use a healing item on yourself (excluding splashes and grenades). Increases in duration at each Level Up: 6 Seconds -> 7 Seconds -> 8 Seconds -> 9 Seconds -> 10 Seconds",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Mythic",
    "summonCost": 15000
  },
  "ZeroPointSprite_Variant_Quack": {
    "description": "Spawn a Shield Bubble Jr. when you use a healing item on yourself (excluding splashes and grenades). Increases in duration at each Level Up: 6 Seconds -> 7 Seconds -> 8 Seconds -> 9 Seconds -> 10 Seconds",
    "hint": "Found rarely in Sprite Chests",
    "rarity": "Mythic",
    "summonCost": 15000
  },
  "CosmicThunderDoubleJumpSprite": {
    "description": "(Active - Jump In Air) Double Jump. Cooldown between jumps decreases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Legendary",
    "summonCost": 1750
  },
  "CosmicThunderDoubleJumpSprite_Variant_A": {
    "description": "(Active - Jump In Air) Double Jump. Cooldown between jumps decreases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Legendary",
    "summonCost": 1750
  },
  "CosmicThunderDoubleJumpSprite_Variant_CheatMaster": {
    "description": "(Active - Jump In Air) Double Jump. Cooldown between jumps decreases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "CosmicThunderDoubleJumpSprite_Variant_Gold": {
    "description": "(Active - Jump In Air) Double Jump. Cooldown between jumps decreases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "CosmicThunderDoubleJumpSprite_Variant_LootHacker": {
    "description": "(Active - Jump In Air) Double Jump. Cooldown between jumps decreases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "CosmicThunderDoubleJumpSprite_Variant_Reaper": {
    "description": "(Active - Jump In Air) Double Jump. Cooldown between jumps decreases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "CosmicThunderDoubleJumpSprite_Variant_TrickTreat": {
    "description": "(Active - Jump In Air) Double Jump. Cooldown between jumps decreases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "ReloadOverTimeSprite": {
    "description": "Automatically reload unequipped weapons over time. Reloads equipped weapon at max level. Automatic reload gets faster with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 1500
  },
  "ReloadOverTimeSprite_Variant_A": {
    "description": "Automatically reload unequipped weapons over time. Reloads equipped weapon at max level. Automatic reload gets faster with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 1500
  },
  "ReloadOverTimeSprite_Variant_CheatMaster": {
    "description": "Automatically reload unequipped weapons over time. Reloads equipped weapon at max level. Automatic reload gets faster with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "ReloadOverTimeSprite_Variant_Gold": {
    "description": "Automatically reload unequipped weapons over time. Reloads equipped weapon at max level. Automatic reload gets faster with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "ReloadOverTimeSprite_Variant_LootHacker": {
    "description": "Automatically reload unequipped weapons over time. Reloads equipped weapon at max level. Automatic reload gets faster with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "ReloadOverTimeSprite_Variant_Reaper": {
    "description": "Automatically reload unequipped weapons over time. Reloads equipped weapon at max level. Automatic reload gets faster with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "ReloadOverTimeSprite_Variant_TrickTreat": {
    "description": "Automatically reload unequipped weapons over time. Reloads equipped weapon at max level. Automatic reload gets faster with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "BushRangerSprite": {
    "description": "Grants a bush on you after a duration, gain a bush on elimination at max level. Time between bush activating decreases with each Level Up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 100
  },
  "BushRangerSprite_Variant_A": {
    "description": "Grants a bush on you after a duration, gain a bush on elimination at max level. Time between bush activating decreases with each Level Up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 100
  },
  "BushRangerSprite_Variant_CheatMaster": {
    "description": "Grants a bush on you after a duration, gain a bush on elimination at max level. Time between bush activating decreases with each Level Up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "BushRangerSprite_Variant_Gold": {
    "description": "Grants a bush on you after a duration, gain a bush on elimination at max level. Time between bush activating decreases with each Level Up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "BushRangerSprite_Variant_LootHacker": {
    "description": "Grants a bush on you after a duration, gain a bush on elimination at max level.",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "BushRangerSprite_Variant_Quack": {
    "description": "Grants a bush on you after a duration, gain a bush on elimination at max level. Time between bush activating decreases with each Level Up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "BushRangerSprite_Variant_Reaper": {
    "description": "Grants a bush on you after a duration, gain a bush on elimination at max level. Time between bush activating decreases with each Level Up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "BushRangerSprite_Variant_TrickTreat": {
    "description": "Grants a bush on you after a duration, gain a bush on elimination at max level. Time between bush activating decreases with each Level Up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "NarrowFleaMonkeySprite": {
    "description": "(Active - Jump In Air) Hover with the help of Tails! Hover speed increased with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 1500
  },
  "NarrowFleaMonkeySprite_Variant_A": {
    "description": "(Active - Jump In Air) Hover with the help of Tails! Hover speed increased with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 1500
  },
  "NarrowFleaMonkeySprite_Variant_CheatMaster": {
    "description": "(Active - Jump In Air) Hover with the help of Tails! Hover speed increased with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "NarrowFleaMonkeySprite_Variant_Gold": {
    "description": "(Active - Jump In Air) Hover with the help of Tails! Hover speed increased with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "NarrowFleaMonkeySprite_Variant_LootHacker": {
    "description": "(Active - Jump In Air) Hover with the help of Tails! Hover speed increased with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "NarrowFleaMonkeySprite_Variant_Reaper": {
    "description": "(Active - Jump In Air) Hover with the help of Tails! Hover speed increased with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "NarrowFleaMonkeySprite_Variant_TrickTreat": {
    "description": "(Active - Jump In Air) Hover with the help of Tails! Hover speed increased with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "KillswitchSprite": {
    "description": "(Active - Aim In Air) Enter Hangtime with improved accuracy. Accuracy increases with each Level Up!",
    "hint": "Found in the world at nighttime",
    "rarity": "Legendary",
    "summonCost": 1750
  },
  "KillswitchSprite_Variant_A": {
    "description": "(Active - Aim In Air) Enter Hangtime with improved accuracy. Accuracy increases with each Level Up!",
    "hint": "Found in the world at nighttime",
    "rarity": "Legendary",
    "summonCost": 1750
  },
  "KillswitchSprite_Variant_CheatMaster": {
    "description": "(Active - Aim In Air) Enter Hangtime with improved accuracy. Accuracy increases with each Level Up!",
    "hint": "Found in the world at nighttime",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "KillswitchSprite_Variant_Gold": {
    "description": "(Active - Aim In Air) Enter Hangtime with improved accuracy. Accuracy increases with each Level Up!",
    "hint": "Found in the world at nighttime",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "KillswitchSprite_Variant_LootHacker": {
    "description": "(Active - Aim In Air) Enter Hangtime with improved accuracy. Accuracy increases with each Level Up!",
    "hint": "Found in the world at nighttime",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "KillswitchSprite_Variant_Reaper": {
    "description": "(Active - Aim In Air) Enter Hangtime with improved accuracy. Accuracy increases with each Level Up!",
    "hint": "Found in the world at nighttime",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "KillswitchSprite_Variant_TrickTreat": {
    "description": "(Active - Aim In Air) Enter Hangtime with improved accuracy. Accuracy increases with each Level Up!",
    "hint": "Found in the world at nighttime",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "DwarfSprite": {
    "description": "Upgrades a random item in the player's inventory with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 100
  },
  "Dwarf_Variant_A": {
    "description": "Upgrades a random item in the player's inventory with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 100
  },
  "Dwarf_Variant_CheatMaster": {
    "description": "Upgrades a random item in the player's inventory with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "Dwarf_Variant_Gold": {
    "description": "Upgrades a random item in the player's inventory with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "Dwarf_Variant_LootHacker": {
    "description": "Upgrades a random item in the player's inventory with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "Dwarf_Variant_Quack": {
    "description": "Upgrades a random item in the player's inventory with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "Dwarf_Variant_Reaper": {
    "description": "Upgrades a random item in the player's inventory with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "Dwarf_Variant_TrickTreat": {
    "description": "Upgrades a random item in the player's inventory with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "KlomboSprite": {
    "description": "Grants random items at each level, only levels up by consuming items. Item quality increases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Mythic",
    "summonCost": 2000
  },
  "Klombo_Variant_A": {
    "description": "Grants random items at each level, only levels up by consuming items. Item quality increases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Mythic",
    "summonCost": 2000
  },
  "Klombo_Variant_CheatMaster": {
    "description": "Grants random items at each level, only levels up by consuming items. Item quality increases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Mythic",
    "summonCost": 2400
  },
  "Klombo_Variant_Gold": {
    "description": "Grants random items at each level, only levels up by consuming items. Item quality increases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Mythic",
    "summonCost": 2400
  },
  "Klombo_Variant_LootHacker": {
    "description": "Grants random items at each level, only levels up by consuming items. Item quality increases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Mythic",
    "summonCost": 2400
  },
  "Klombo_Variant_Quack": {
    "description": "Grants random items at each level, only levels up by consuming items. Item quality increases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Mythic",
    "summonCost": 2400
  },
  "Klombo_Variant_Reaper": {
    "description": "Grants random items at each level, only levels up by consuming items. Item quality increases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Mythic",
    "summonCost": 2400
  },
  "Klombo_Variant_TrickTreat": {
    "description": "Grants random items at each level, only levels up by consuming items. Item quality increases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Mythic",
    "summonCost": 2400
  },
  "JonesySprite": {
    "description": "Recover some health or shields after being damaged after a short duration. Increase amount healed with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 100
  },
  "Jonesy_Variant_A": {
    "description": "Recover some health or shields after being damaged after a short duration. Increase amount healed with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 100
  },
  "Jonesy_Variant_CheatMaster": {
    "description": "Recover some health or shields after being damaged after a short duration. Increase amount healed with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "Jonesy_Variant_Gold": {
    "description": "Recover some health or shields after being damaged after a short duration. Increase amount healed with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "Jonesy_Variant_LootHacker": {
    "description": "Recover some health or shields after being damaged after a short duration. Increase amount healed with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "Jonesy_Variant_Quack": {
    "description": "Recover some health or shields after being damaged after a short duration. Increase amount healed with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "Jonesy_Variant_Reaper": {
    "description": "Recover some health or shields after being damaged after a short duration. Increase amount healed with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "Jonesy_Variant_TrickTreat": {
    "description": "Recover some health or shields after being damaged after a short duration. Increase amount healed with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "NarrowFleaSprite": {
    "description": "Gotta Go Fast! Sprint faster with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 1500
  },
  "NarrowFleaSprite_Variant_A": {
    "description": "Gotta Go Fast! Sprint faster with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 1500
  },
  "NarrowFleaSprite_Variant_CheatMaster": {
    "description": "Gotta Go Fast! Sprint faster with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "NarrowFleaSprite_Variant_Gold": {
    "description": "Gotta Go Fast! Sprint faster with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "NarrowFleaSprite_Variant_LootHacker": {
    "description": "Gotta Go Fast! Sprint faster with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "NarrowFleaSprite_Variant_Reaper": {
    "description": "Gotta Go Fast! Sprint faster with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "NarrowFleaSprite_Variant_TrickTreat": {
    "description": "Gotta Go Fast! Sprint faster with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "CrownSprite": {
    "description": "Only levels up by winning matches while equipped. Mastery with 1 win.  New variants unlocked after mastering!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Mythic",
    "summonCost": 2000
  },
  "CrownSprite_Variant_A": {
    "description": "Only levels up by winning matches while equipped. Mastery with 1 win.  New variants unlocked after mastering!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Mythic",
    "summonCost": 2000
  },
  "CrownSprite_Variant_CheatMaster": {
    "description": "Only levels up by winning matches while equipped. Mastery with 1 win.  New variants unlocked after mastering!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Mythic",
    "summonCost": 2400
  },
  "CrownSprite_Variant_Gold": {
    "description": "Only levels up by winning matches while equipped. Mastery with 1 win.  New variants unlocked after mastering!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Mythic",
    "summonCost": 2400
  },
  "CrownSprite_Variant_LootHacker": {
    "description": "Only levels up by winning matches while equipped. Mastery with 1 win.  New variants unlocked after mastering!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Mythic",
    "summonCost": 2400
  },
  "CrownSprite_Variant_Reaper": {
    "description": "Only levels up by winning matches while equipped. Mastery with 1 win.  New variants unlocked after mastering!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Mythic",
    "summonCost": 2400
  },
  "CrownSprite_Variant_TrickTreat": {
    "description": "Only levels up by winning matches while equipped. Mastery with 1 win.  New variants unlocked after mastering!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Mythic",
    "summonCost": 2400
  },
  "8BitBlasterSprite": {
    "description": "Find an 8-Bit Shotgun in your first chest and gain a score multiplier for it.",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1250
  },
  "8BitBlaster_Variant_A": {
    "description": "Find an 8-Bit Shotgun in your first chest and gain a score multiplier for it.",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1250
  },
  "8BitBlaster_Variant_CheatMaster": {
    "description": "Find an 8-Bit Shotgun in your first chest and gain a score multiplier for it.",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "8BitBlaster_Variant_Gold": {
    "description": "Find an 8-Bit Shotgun in your first chest and gain a score multiplier for it.",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "8BitBlaster_Variant_LootHacker": {
    "description": "Find an 8-Bit Shotgun in your first chest and gain a score multiplier for it.",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "8BitBlaster_Variant_Reaper": {
    "description": "Find an 8-Bit Shotgun in your first chest and gain a score multiplier for it.",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "8BitBlaster_Variant_TrickTreat": {
    "description": "Find an 8-Bit Shotgun in your first chest and gain a score multiplier for it.",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "StormScoutSprite": {
    "description": "Applies Overdrive after taking a certain amount of storm damage. Reveals future Storm Circles at max level. Increases Overdrive duration with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1250
  },
  "StormScoutSprite_Variant_A": {
    "description": "Applies Overdrive after taking a certain amount of storm damage. Reveals future Storm Circles at max level. Increases Overdrive duration with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1250
  },
  "StormScoutSprite_Variant_CheatMaster": {
    "description": "Applies Overdrive after taking a certain amount of storm damage. Reveals future Storm Circles at max level. Increases Overdrive duration with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "StormScoutSprite_Variant_Gold": {
    "description": "Applies Overdrive after taking a certain amount of storm damage. Reveals future Storm Circles at max level. Increases Overdrive duration with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "StormScoutSprite_Variant_LootHacker": {
    "description": "Applies Overdrive after taking a certain amount of storm damage. Reveals future Storm Circles at max level. Increases Overdrive duration with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "StormScoutSprite_Variant_Reaper": {
    "description": "Applies Overdrive after taking a certain amount of storm damage. Reveals future Storm Circles at max level. Increases Overdrive duration with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "StormScoutSprite_Variant_TrickTreat": {
    "description": "Applies Overdrive after taking a certain amount of storm damage. Reveals future Storm Circles at max level. Increases Overdrive duration with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "ImprovedSlide": {
    "description": "Slip and slide around with reduced friction while Sliding. Slide farther with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1250
  },
  "ImprovedSlide_Variant_A": {
    "description": "Slip and slide around with reduced friction while Sliding. Slide farther with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1250
  },
  "OvershieldSprite": {
    "description": "Grants overshield, scaling with level.",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 1500
  },
  "OvershieldSprite_Variant_A": {
    "description": "Grants overshield, scaling with level.",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 1500
  },
  "OvershieldSprite_Variant_CheatMaster": {
    "description": "Grants overshield, scaling with level.",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "OvershieldSprite_Variant_Gold": {
    "description": "Grants overshield, scaling with level.",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "OvershieldSprite_Variant_LootHacker": {
    "description": "Grants overshield, scaling with level.",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "OvershieldSprite_Variant_Reaper": {
    "description": "Grants overshield, scaling with level.",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "OvershieldSprite_Variant_TrickTreat": {
    "description": "Grants overshield, scaling with level.",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "WinnerBSprite": {
    "description": "Periodically mark enemies in an area around you. Mark more often with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 1750
  },
  "WinnerBSprite_Variant_A": {
    "description": "Periodically mark enemies in an area around you. Mark more often with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 1750
  },
  "WinnerBSprite_Variant_CheatMaster": {
    "description": "Periodically mark enemies in an area around you. Mark more often with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "WinnerBSprite_Variant_Gold": {
    "description": "Periodically mark enemies in an area around you. Mark more often with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "WinnerBSprite_Variant_LootHacker": {
    "description": "Periodically mark enemies in an area around you. Mark more often with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "WinnerBSprite_Variant_Reaper": {
    "description": "Periodically mark enemies in an area around you. Mark more often with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "WinnerBSprite_Variant_TrickTreat": {
    "description": "Periodically mark enemies in an area around you. Mark more often with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "WinnerCSprite": {
    "description": "Applies Overdrive after eating or drinking a Consumable. Overdrive lasts longer with each Level Up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1250
  },
  "WinnerCSprite_Variant_A": {
    "description": "Applies Overdrive after eating or drinking a Consumable. Overdrive lasts longer with each Level Up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1250
  },
  "WinnerCSprite_Variant_CheatMaster": {
    "description": "Applies Overdrive after eating or drinking a Consumable. Overdrive lasts longer with each Level Up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "WinnerCSprite_Variant_Gold": {
    "description": "Applies Overdrive after eating or drinking a Consumable. Overdrive lasts longer with each Level Up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "WinnerCSprite_Variant_LootHacker": {
    "description": "Applies Overdrive after eating or drinking a Consumable. Overdrive lasts longer with each Level Up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "WinnerCSprite_Variant_Reaper": {
    "description": "Applies Overdrive after eating or drinking a Consumable. Overdrive lasts longer with each Level Up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "WinnerCSprite_Variant_TrickTreat": {
    "description": "Applies Overdrive after eating or drinking a Consumable. Overdrive lasts longer with each Level Up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "IncreaseHealsSprite": {
    "description": "Increases the effectiveness of healing items. Healing effectiveness increases with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1500
  },
  "IncreaseHealsSprite_Variant_A": {
    "description": "Increases the effectiveness of healing items. Healing effectiveness increases with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1500
  },
  "IncreaseHealsSprite_Variant_CheatMaster": {
    "description": "Increases the effectiveness of healing items. Healing effectiveness increases with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "IncreaseHealsSprite_Variant_Gold": {
    "description": "Increases the effectiveness of healing items. Healing effectiveness increases with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "IncreaseHealsSprite_Variant_LootHacker": {
    "description": "Increases the effectiveness of healing items. Healing effectiveness increases with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "IncreaseHealsSprite_Variant_Reaper": {
    "description": "Increases the effectiveness of healing items. Healing effectiveness increases with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "IncreaseHealsSprite_Variant_TrickTreat": {
    "description": "Increases the effectiveness of healing items. Healing effectiveness increases with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "BodySlamSprite": {
    "description": "(Active - Jump In Air) Triggers a whirlwind attack, damaging and knocking back nearby enemies. Damage increases and cooldown decreases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Legendary",
    "summonCost": 1750
  },
  "BodySlamSprite_Variant_A": {
    "description": "(Active - Jump In Air) Triggers a whirlwind attack, damaging and knocking back nearby enemies. Damage increases and cooldown decreases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Legendary",
    "summonCost": 1750
  },
  "BodySlamSprite_Variant_CheatMaster": {
    "description": "(Active - Jump In Air) Triggers a whirlwind attack, damaging and knocking back nearby enemies. Damage increases and cooldown decreases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "BodySlamSprite_Variant_Gold": {
    "description": "(Active - Jump In Air) Triggers a whirlwind attack, damaging and knocking back nearby enemies. Damage increases and cooldown decreases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "BodySlamSprite_Variant_LootHacker": {
    "description": "(Active - Jump In Air) Triggers a whirlwind attack, damaging and knocking back nearby enemies. Damage increases and cooldown decreases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "BodySlamSprite_Variant_Reaper": {
    "description": "(Active - Jump In Air) Triggers a whirlwind attack, damaging and knocking back nearby enemies. Damage increases and cooldown decreases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "BodySlamSprite_Variant_TrickTreat": {
    "description": "(Active - Jump In Air) Triggers a whirlwind attack, damaging and knocking back nearby enemies. Damage increases and cooldown decreases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "WinnerASprite": {
    "description": "(Active) - Jump shortly after landing to trigger a Super Jump, if charges are present. Gain charges over time. Super jump strength increases and cooldown decreases with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1500
  },
  "WinnerASprite_Variant_A": {
    "description": "(Active) - Jump shortly after landing to trigger a Super Jump, if charges are present. Gain charges over time. Super jump strength increases and cooldown decreases with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1500
  },
  "WinnerASprite_Variant_CheatMaster": {
    "description": "(Active) - Jump shortly after landing to trigger a Super Jump, if charges are present. Gain charges over time. Super jump strength increases and cooldown decreases with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "WinnerASprite_Variant_Gold": {
    "description": "(Active) - Jump shortly after landing to trigger a Super Jump, if charges are present. Gain charges over time. Super jump strength increases and cooldown decreases with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "WinnerASprite_Variant_LootHacker": {
    "description": "(Active) - Jump shortly after landing to trigger a Super Jump, if charges are present. Gain charges over time. Super jump strength increases and cooldown decreases with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "WinnerASprite_Variant_Reaper": {
    "description": "(Active) - Jump shortly after landing to trigger a Super Jump, if charges are present. Gain charges over time. Super jump strength increases and cooldown decreases with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "WinnerASprite_Variant_TrickTreat": {
    "description": "(Active) - Jump shortly after landing to trigger a Super Jump, if charges are present. Gain charges over time. Super jump strength increases and cooldown decreases with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "BirthdaySprite": {
    "description": "Opening chests has a chance to spawn a piece of cake. Eliminations can spawn cake at max level. Chance to spawn cake increases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1250
  },
  "BirthdaySprite_Variant_A": {
    "description": "Opening chests has a chance to spawn a piece of cake. Eliminations can spawn cake at max level. Chance to spawn cake increases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1250
  },
  "BirthdaySprite_Variant_CheatMaster": {
    "description": "Opening chests has a chance to spawn a piece of cake. Eliminations can spawn cake at max level. Chance to spawn cake increases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "BirthdaySprite_Variant_Gold": {
    "description": "Opening chests has a chance to spawn a piece of cake. Eliminations can spawn cake at max level. Chance to spawn cake increases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "BirthdaySprite_Variant_LootHacker": {
    "description": "Opening chests has a chance to spawn a piece of cake. Eliminations can spawn cake at max level. Chance to spawn cake increases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "BirthdaySprite_Variant_Reaper": {
    "description": "Opening chests has a chance to spawn a piece of cake. Eliminations can spawn cake at max level. Chance to spawn cake increases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "BirthdaySprite_Variant_TrickTreat": {
    "description": "Opening chests has a chance to spawn a piece of cake. Eliminations can spawn cake at max level. Chance to spawn cake increases with each Level Up!",
    "hint": "Spotted near high and mountainous areas",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "GhostDamage": {
    "description": "Grants cloak for a duration when you take damage. Cloak duration increases with each Level Up!",
    "hint": "Found in the world at nighttime",
    "rarity": "Legendary",
    "summonCost": 1750
  },
  "GhostDamage_Variant_A": {
    "description": "Grants cloak for a duration when you take damage. Cloak duration increases with each Level Up!",
    "hint": "Found in the world at nighttime",
    "rarity": "Legendary",
    "summonCost": 1750
  },
  "GhostDamage_Variant_CheatMaster": {
    "description": "Grants cloak for a duration when you take damage. Cloak duration increases with each Level Up!",
    "hint": "Found in the world at nighttime",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "GhostDamage_Variant_Gold": {
    "description": "Grants cloak for a duration when you take damage. Cloak duration increases with each Level Up!",
    "hint": "Found in the world at nighttime",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "GhostDamage_Variant_LootHacker": {
    "description": "Grants cloak for a duration when you take damage. Cloak duration increases with each Level Up!",
    "hint": "Found in the world at nighttime",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "GhostDamage_Variant_Reaper": {
    "description": "Grants cloak for a duration when you take damage. Cloak duration increases with each Level Up!",
    "hint": "Found in the world at nighttime",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "GhostDamage_Variant_TrickTreat": {
    "description": "Grants cloak for a duration when you take damage. Cloak duration increases with each Level Up!",
    "hint": "Found in the world at nighttime",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "WinnerDSprite": {
    "description": "Food provides bonus healing. Find food when jumping out of hiding props, and a small chance when opening containers. Find better food with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1500
  },
  "WinnerDSprite_Variant_A": {
    "description": "Food provides bonus healing. Find food when jumping out of hiding props, and a small chance when opening containers. Find better food with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1500
  },
  "WinnerDSprite_Variant_CheatMaster": {
    "description": "Food provides bonus healing. Find food when jumping out of hiding props, and a small chance when opening containers. Find better food with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "WinnerDSprite_Variant_Gold": {
    "description": "Food provides bonus healing. Find food when jumping out of hiding props, and a small chance when opening containers. Find better food with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "WinnerDSprite_Variant_LootHacker": {
    "description": "Food provides bonus healing. Find food when jumping out of hiding props, and a small chance when opening containers. Find better food with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "WinnerDSprite_Variant_Reaper": {
    "description": "Food provides bonus healing. Find food when jumping out of hiding props, and a small chance when opening containers. Find better food with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "WinnerDSprite_Variant_TrickTreat": {
    "description": "Food provides bonus healing. Find food when jumping out of hiding props, and a small chance when opening containers. Find better food with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "IncreasedMeleeSprite": {
    "description": "Melee attacks deal more damage. Melee attack damage increases with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 1750
  },
  "IncreasedMeleeSprite_Variant_A": {
    "description": "Melee attacks deal more damage. Melee attack damage increases with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 1750
  },
  "IncreasedMeleeSprite_Variant_CheatMaster": {
    "description": "Melee attacks deal more damage. Melee attack damage increases with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "IncreasedMeleeSprite_Variant_Gold": {
    "description": "Melee attacks deal more damage. Melee attack damage increases with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "IncreasedMeleeSprite_Variant_LootHacker": {
    "description": "Melee attacks deal more damage. Melee attack damage increases with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "IncreasedMeleeSprite_Variant_Reaper": {
    "description": "Melee attacks deal more damage. Melee attack damage increases with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "IncreasedMeleeSprite_Variant_TrickTreat": {
    "description": "Melee attacks deal more damage. Melee attack damage increases with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "PhaseDashSprite": {
    "description": "(Active - Jump In Air) Spooky Dash lets you phase through some objects. Gain charges over time. Charge cooldown decreases with each Level Up!",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2000
  },
  "PhaseDashSprite_Variant_A": {
    "description": "(Active - Jump In Air) Spooky Dash lets you phase through some objects. Gain charges over time. Charge cooldown decreases with each Level Up!",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2000
  },
  "PhaseDashSprite_Variant_CheatMaster": {
    "description": "(Active - Jump In Air) Spooky Dash lets you phase through some objects. Gain charges over time. Charge cooldown decreases with each Level Up!",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2400
  },
  "PhaseDashSprite_Variant_Gold": {
    "description": "(Active - Jump In Air) Spooky Dash lets you phase through some objects. Gain charges over time. Charge cooldown decreases with each Level Up!",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2400
  },
  "PhaseDashSprite_Variant_LootHacker": {
    "description": "(Active - Jump In Air) Spooky Dash lets you phase through some objects. Gain charges over time. Charge cooldown decreases with each Level Up!",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2400
  },
  "PhaseDashSprite_Variant_Quack": {
    "description": "(Active - Jump In Air) Spooky Dash lets you phase through some objects. Gain charges over time. Charge cooldown decreases with each Level Up!",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2400
  },
  "PhaseDashSprite_Variant_Reaper": {
    "description": "(Active - Jump In Air) Spooky Dash lets you phase through some objects. Gain charges over time. Charge cooldown decreases with each Level Up!",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2400
  },
  "PhaseDashSprite_Variant_TrickTreat": {
    "description": "(Active - Jump In Air) Spooky Dash lets you phase through some objects. Gain charges over time. Charge cooldown decreases with each Level Up!",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2400
  },
  "HealthSiphonSprite": {
    "description": "Recover health when damaging an enemy. Health recovered percent increases with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 1750
  },
  "HealthSiphonSprite_Variant_A": {
    "description": "Recover health when damaging an enemy. Health recovered percent increases with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 1750
  },
  "HealthSiphonSprite_Variant_CheatMaster": {
    "description": "Recover health when damaging an enemy. Health recovered percent increases with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "HealthSiphonSprite_Variant_Gold": {
    "description": "Recover health when damaging an enemy. Health recovered percent increases with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "HealthSiphonSprite_Variant_LootHacker": {
    "description": "Recover health when damaging an enemy. Health recovered percent increases with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "HealthSiphonSprite_Variant_Reaper": {
    "description": "Recover health when damaging an enemy. Health recovered percent increases with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "HealthSiphonSprite_Variant_TrickTreat": {
    "description": "Recover health when damaging an enemy. Health recovered percent increases with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "WinnerESprite": {
    "description": "Chance to spawn bees at the hit location upon dealing damage with a ranged weapon",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1500
  },
  "WinnerE_Variant_A": {
    "description": "Chance to spawn bees at the hit location upon dealing damage with a ranged weapon",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1500
  },
  "WinnerE_Variant_CheatMaster": {
    "description": "Chance to spawn bees at the hit location upon dealing damage with a ranged weapon",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "WinnerE_Variant_Gold": {
    "description": "Chance to spawn bees at the hit location upon dealing damage with a ranged weapon",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "WinnerE_Variant_LootHacker": {
    "description": "Chance to spawn bees at the hit location upon dealing damage with a ranged weapon",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "WinnerE_Variant_Reaper": {
    "description": "Chance to spawn bees at the hit location upon dealing damage with a ranged weapon",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "WinnerE_Variant_TrickTreat": {
    "description": "Chance to spawn bees at the hit location upon dealing damage with a ranged weapon",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "CargoLyingSprite": {
    "description": "Extract other players equipped Sprites when eliminating them. Push everything away when damaged. Gets upset when removed and marks you on the map",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2000
  },
  "CargoLyingSprite_Variant_A": {
    "description": "Extract other players equipped Sprites when eliminating them. Push everything away when damaged. Gets upset when removed and marks you on the map",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2000
  },
  "CargoLyingSprite_Variant_CheatMaster": {
    "description": "Extract other players equipped Sprites when eliminating them. Push everything away when damaged. Gets upset when removed and marks you on the map",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2400
  },
  "CargoLyingSprite_Variant_Gold": {
    "description": "Extract other players equipped Sprites when eliminating them. Push everything away when damaged. Gets upset when removed and marks you on the map",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2400
  },
  "CargoLyingSprite_Variant_LootHacker": {
    "description": "Extract other players equipped Sprites when eliminating them. Push everything away when damaged. Gets upset when removed and marks you on the map",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2400
  },
  "CargoLyingSprite_Variant_Reaper": {
    "description": "Extract other players equipped Sprites when eliminating them. Push everything away when damaged. Gets upset when removed and marks you on the map",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2400
  },
  "CargoLyingSprite_Variant_TrickTreat": {
    "description": "Extract other players equipped Sprites when eliminating them. Push everything away when damaged. Gets upset when removed and marks you on the map",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2400
  },
  "FeedJet": {
    "description": "Grants extra resources on pickup, with Teammates who also have this Sprite equipped receiving some extra resources as well! Increased amount of resources received at each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 1750
  },
  "FeedJet_Variant_A": {
    "description": "Grants extra resources on pickup, with Teammates who also have this Sprite equipped receiving some extra resources as well! Increased amount of resources received at each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 1750
  },
  "StarLight": {
    "description": "Grants a random item at each level, exploding with Mythic loot at Max Level. Loot value increases at each Level Up!",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2000
  },
  "StarLight_Variant_A": {
    "description": "Grants a random item at each level, exploding with Mythic loot at Max Level. Loot value increases at each Level Up!",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2000
  },
  "CoinPile": {
    "description": "Opening Chest grants increased pickaxe speed and movement speed. Increased duration with each Level Up!",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2000
  },
  "CoinPile_Variant_A": {
    "description": "Opening Chest grants increased pickaxe speed and movement speed. Increased duration with each Level Up!",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2000
  },
  "CoinPile_Variant_Cursed": {
    "description": "Opening Chest grants increased pickaxe speed and movement speed. Increased duration with each Level Up!",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2500
  },
  "CoinPile_Variant_Jeweled": {
    "description": "Opening Chest grants increased pickaxe speed and movement speed. Increased duration with each Level Up!",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2500
  },
  "CoinPile_Variant_LiquidGold": {
    "description": "Opening Chest grants increased pickaxe speed and movement speed. Increased duration with each Level Up!",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2500
  },
  "RookGecko": {
    "description": "Generates a Chug Splash effect when restoring shields. Decreased cooldown with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 1750
  },
  "RookGecko_Variant_A": {
    "description": "Generates a Chug Splash effect when restoring shields. Decreased cooldown with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 1750
  },
  "RookGecko_Variant_Cursed": {
    "description": "Generates a Chug Splash effect when restoring shields. Decreased cooldown with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "RookGecko_Variant_Jeweled": {
    "description": "Generates a Chug Splash effect when restoring shields. Decreased cooldown with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "RookGecko_Variant_LiquidGold": {
    "description": "Generates a Chug Splash effect when restoring shields. Decreased cooldown with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "PlaymakerBrewery": {
    "description": "Creates a small shockwave on landing knocking back enemies, also nullifies fall damage. Increased knockback strength with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 1750
  },
  "PlaymakerBrewery_Variant_A": {
    "description": "Creates a small shockwave on landing knocking back enemies, also nullifies fall damage. Increased knockback strength with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 1750
  },
  "PlaymakerBrewery_Variant_Cursed": {
    "description": "Creates a small shockwave on landing knocking back enemies, also nullifies fall damage. Increased knockback strength with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "PlaymakerBrewery_Variant_Jeweled": {
    "description": "Creates a small shockwave on landing knocking back enemies, also nullifies fall damage. Increased knockback strength with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "PlaymakerBrewery_Variant_LiquidGold": {
    "description": "Creates a small shockwave on landing knocking back enemies, also nullifies fall damage. Increased knockback strength with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "Squibbly": {
    "description": "Fish fishing spots by jumping into them and gain bonus loot. Earn more and better items as you level up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1500
  },
  "Squibbly_Variant_A": {
    "description": "Fish fishing spots by jumping into them and gain bonus loot. Earn more and better items as you level up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1500
  },
  "Squibbly_Variant_Cursed": {
    "description": "Fish fishing spots by jumping into them and gain bonus loot. Earn more and better items as you level up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "Squibbly_Variant_Jeweled": {
    "description": "Fish fishing spots by jumping into them and gain bonus loot. Earn more and better items as you level up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "Squibbly_Variant_LiquidGold": {
    "description": "Fish fishing spots by jumping into them and gain bonus loot. Earn more and better items as you level up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "UnbotheredFish": {
    "description": "Restores health over time when in water. Increased amount of health with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1500
  },
  "UnbotheredFish_Variant_A": {
    "description": "Restores health over time when in water. Increased amount of health with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1500
  },
  "UnbotheredFish_Variant_Cursed": {
    "description": "Restores health over time when in water. Increased amount of health with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "UnbotheredFish_Variant_Jeweled": {
    "description": "Restores health over time when in water. Increased amount of health with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "UnbotheredFish_Variant_LiquidGold": {
    "description": "Restores health over time when in water. Increased amount of health with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "Compass": {
    "description": "Reveals Sprites nearby and grants more items when opening Buried Chests. Sprite detection radius increases with each Level Up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1250
  },
  "Compass_Variant_A": {
    "description": "Reveals Sprites nearby and grants more items when opening Buried Chests. Sprite detection radius increases with each Level Up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1250
  },
  "Compass_Variant_Cursed": {
    "description": "Reveals Sprites nearby and grants more items when opening Buried Chests. Sprite detection radius increases with each Level Up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "Compass_Variant_Jeweled": {
    "description": "Reveals Sprites nearby and grants more items when opening Buried Chests. Sprite detection radius increases with each Level Up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "Compass_Variant_LiquidGold": {
    "description": "Reveals Sprites nearby and grants more items when opening Buried Chests. Sprite detection radius increases with each Level Up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "TreasureMap": {
    "description": "Reveals Treasure Maps and Wanted Posters. Spawns a Treasure Map at Max Level!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1500
  },
  "TreasureMap_Variant_A": {
    "description": "Reveals Treasure Maps and Wanted Posters. Spawns a Treasure Map at Max Level!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1500
  },
  "TreasureMap_Variant_Cursed": {
    "description": "Reveals Treasure Maps and Wanted Posters. Spawns a Treasure Map at Max Level!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "TreasureMap_Variant_Jeweled": {
    "description": "Reveals Treasure Maps and Wanted Posters. Spawns a Treasure Map at Max Level!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "TreasureMap_Variant_LiquidGold": {
    "description": "Reveals Treasure Maps and Wanted Posters. Spawns a Treasure Map at Max Level!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "BarrelOfFish": {
    "description": "Reduces tactical sprint stamina drain when in water. Gain Slap at max level!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1250
  },
  "BarrelOfFish_Variant_A": {
    "description": "Reduces tactical sprint stamina drain when in water. Gain Slap at max level!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1250
  },
  "BarrelOfFish_Variant_Cursed": {
    "description": "Reduces tactical sprint stamina drain when in water. Gain Slap at max level!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "BarrelOfFish_Variant_Jeweled": {
    "description": "Reduces tactical sprint stamina drain when in water. Gain Slap at max level!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "BarrelOfFish_Variant_LiquidGold": {
    "description": "Reduces tactical sprint stamina drain when in water. Gain Slap at max level!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "TreasureChest": {
    "description": "Grants a chance to spawn extra loot from Treasure Chests and nullifies fall damage. Increased chance of spawning an extra loot item with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1500
  },
  "TreasureChest_Variant_A": {
    "description": "Grants a chance to spawn extra loot from Treasure Chests and nullifies fall damage. Increased chance of spawning an extra loot item with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1500
  },
  "TreasureChest_Variant_Cursed": {
    "description": "Grants a chance to spawn extra loot from Treasure Chests and nullifies fall damage. Increased chance of spawning an extra loot item with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "TreasureChest_Variant_Jeweled": {
    "description": "Grants a chance to spawn extra loot from Treasure Chests and nullifies fall damage. Increased chance of spawning an extra loot item with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "TreasureChest_Variant_LiquidGold": {
    "description": "Grants a chance to spawn extra loot from Treasure Chests and nullifies fall damage. Increased chance of spawning an extra loot item with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "Parrot": {
    "description": "Increases reload speed, with a chance that reloading refunds ammo. Reload faster and higher chance of ammo refunds with each Level Up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1250
  },
  "Parrot_Variant_A": {
    "description": "Increases reload speed, with a chance that reloading refunds ammo. Reload faster and higher chance of ammo refunds with each Level Up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1250
  },
  "Parrot_Variant_Cursed": {
    "description": "Increases reload speed, with a chance that reloading refunds ammo. Reload faster and higher chance of ammo refunds with each Level Up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "Parrot_Variant_Jeweled": {
    "description": "Increases reload speed, with a chance that reloading refunds ammo. Reload faster and higher chance of ammo refunds with each Level Up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "Parrot_Variant_LiquidGold": {
    "description": "Increases reload speed, with a chance that reloading refunds ammo. Reload faster and higher chance of ammo refunds with each Level Up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "PeelyBones": {
    "description": "Marks eliminations on the map. Effect radius increases with each level up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1250
  },
  "PeelyBones_Variant_A": {
    "description": "Marks eliminations on the map. Effect radius increases with each level up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1250
  },
  "PeelyBones_Variant_Cursed": {
    "description": "Marks eliminations on the map. Effect radius increases with each level up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "PeelyBones_Variant_Jeweled": {
    "description": "Marks eliminations on the map. Effect radius increases with each level up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "PeelyBones_Variant_LiquidGold": {
    "description": "Marks eliminations on the map. Effect radius increases with each level up!",
    "hint": "",
    "rarity": "Rare",
    "summonCost": 1500
  },
  "YortMelee": {
    "description": "Grants regenerating Zero Point dash charges. Max charges increase and recharge time decrease with Level Up!",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2000
  },
  "YortMelee_Variant_A": {
    "description": "Grants regenerating Zero Point dash charges. Max charges increase and recharge time decrease with Level Up!",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2000
  },
  "DaffodilChurn": {
    "description": "Grants a Friendship Bubble when emoting with other players. Decreased cooldown with each Level Up!",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2000
  },
  "DaffodilChurn_Variant_A": {
    "description": "Grants a Friendship Bubble when emoting with other players. Decreased cooldown with each Level Up!",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2000
  },
  "DaffodilChurn_Variant_Cursed": {
    "description": "Grants a Friendship Bubble when emoting with other players. Decreased cooldown with each Level Up!",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2500
  },
  "DaffodilChurn_Variant_Jeweled": {
    "description": "Grants a Friendship Bubble when emoting with other players. Decreased cooldown with each Level Up!",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2500
  },
  "DaffodilChurn_Variant_LiquidGold": {
    "description": "Grants a Friendship Bubble when emoting with other players. Decreased cooldown with each Level Up!",
    "hint": "",
    "rarity": "Mythic",
    "summonCost": 2500
  },
  "WhiteTiger": {
    "description": "Grants increased Pickaxe damage, also gives a temporary speed boost when your Shield breaks. Increased Pickaxe damage and speed boost with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 1750
  },
  "WhiteTiger_Variant_A": {
    "description": "Grants increased Pickaxe damage, also gives a temporary speed boost when your Shield breaks. Increased Pickaxe damage and speed boost with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 1750
  },
  "WhiteTiger_Variant_Cursed": {
    "description": "Grants increased Pickaxe damage, also gives a temporary speed boost when your Shield breaks. Increased Pickaxe damage and speed boost with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "WhiteTiger_Variant_Jeweled": {
    "description": "Grants increased Pickaxe damage, also gives a temporary speed boost when your Shield breaks. Increased Pickaxe damage and speed boost with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "WhiteTiger_Variant_LiquidGold": {
    "description": "Grants increased Pickaxe damage, also gives a temporary speed boost when your Shield breaks. Increased Pickaxe damage and speed boost with each Level Up!",
    "hint": "",
    "rarity": "Legendary",
    "summonCost": 2100
  },
  "PirateCalamari": {
    "description": "Deploys a Healing Smoke Bomb at low health. Decreased cooldown and increased duration and healing with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1500
  },
  "PirateCalamari_Variant_A": {
    "description": "Deploys a Healing Smoke Bomb at low health. Decreased cooldown and increased duration and healing with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1500
  },
  "PirateCalamari_Variant_Cursed": {
    "description": "Deploys a Healing Smoke Bomb at low health. Decreased cooldown and increased duration and healing with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "PirateCalamari_Variant_Jeweled": {
    "description": "Deploys a Healing Smoke Bomb at low health. Decreased cooldown and increased duration and healing with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  },
  "PirateCalamari_Variant_LiquidGold": {
    "description": "Deploys a Healing Smoke Bomb at low health. Decreased cooldown and increased duration and healing with each Level Up!",
    "hint": "",
    "rarity": "Epic",
    "summonCost": 1800
  }
}
