# Fight Arena — Clean Core Architecture

## v0.8.8 Core Refresh

`v088.html` is the clean-core preview build.

It loads only:

- `core-v088.css` — current visual system, fighter/villain sprites and combat VFX
- `core-v088.js` — current game data, UI, save migration, combat, hero abilities, enemy AI, boss system and progression

The preview does **not** load the historical patch chain (`spider-v084`, `heroes-v085`, `qol-v0851`, `stability-v086`, `villains-v087`, `release-v087`). Those files remain in the repository only as legacy/rollback history while v0.8.8 is being tested.

## Rules for future updates

1. Add canonical fighter stats to the `CHARS` table in `core-v088.js`.
2. Add campaign enemies to the `LEVELS` table.
3. Keep all damage routed through the guarded `damageEnemy` / `damagePlayer` functions.
4. Preserve the `fightArenaV08` localStorage key unless a deliberate save migration is introduced.
5. Update the visible version, Update Log and **Latest Update** tile for every release.
6. Every fifth campaign level can use the reusable Boss System and may award diamonds.
7. Cosmetics should affect presentation only unless a future gameplay system explicitly says otherwise.
8. Test the clean-core preview before replacing the live `index.html`.

## Current clean-core content

Playable roster: Rookie, El Primo, Spider-Man, Captain America, Iron Man.

Campaign: Nightfang, Ultron, Green Goblin, Mysterio, Kingpin (Boss), Prowler.

Currencies: coins for fighters and diamonds reserved for premium/cosmetic progression.

Redeem code retained: `BrandNewDay` (+5,000 coins, once per save).
