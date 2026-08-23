# Multiverse Arena v0.9.6 — Premium Presentation

Mobile-first 1v1 fighting game built around iPad/tablet touch play, with responsive iPhone and desktop layouts.

## Current release

v0.9.6 is the Premium Presentation release on top of the cleaned v0.9.5.8 canonical combat core. The presentation layer upgrades the home screen, Collection, Villain Gauntlet, Training, Settings, combat HUD, results flow and responsive touch layouts without changing established combat balance.

### Playable fighters
- Rookie
- El Primo
- Spider-Man
- Captain America
- Iron Man
- Daredevil
- Moon Knight
- Black Panther
- Wolverine
- Punisher — unlocked through the Villain Gauntlet

The project also contains skins and Ability Variants, including Nanotech Iron Man and Kinetic Black Panther.

### Villain Gauntlet
**Prologue:** Nightfang → Voltage → Razor → Titan → Arena Champion  
**Phase 1:** Crossbones → Bullseye → Punisher → Taskmaster → Kingpin  
**Phase 2:** Rhino → Electro → Mysterio → Green Goblin → Doctor Octopus

Ultron and Prowler remain preserved in the project as standby encounters.

## Architecture
- Production entry point: `app/core/bootstrap-v096.js`
- Canonical generated combat core: `app/core/core-runtime-v0958.js`
- Save key: `fightArenaV08` — do not rename without an explicit migration
- Touch input: `touch-v0941.js`
- Combat cleanup/stability: `stability-v0941.js` + `polish-v09572.js`
- Campaign: `campaign-v0957.js`
- Premium presentation: `premium-v096.css` + `premium-v096.js`
- Final v0.9.6 touch/tablet polish: `premium-v096-final.css`

See `CORE_ARCHITECTURE.md` for the protected compatibility rules.

## Development rules
1. Preserve working combat, save, progression and touch behavior unless a release explicitly targets gameplay.
2. Do not reintroduce fight-path `MutationObserver` loops, recursive class feedback or per-frame DOM rebuild work.
3. Keep iPad/mobile performance as a release requirement.
4. Add or extend regression checks when fixing a production bug.
5. Do not hand-edit the generated canonical combat core; change its source transforms and rebuild it instead.

## Deployment
The repository deploys as a static site through the GitHub Pages workflow in `.github/workflows/pages.yml`. `index.html` loads the production bootstrap, which owns runtime load order and v0.9.6 presentation initialization.
