# Multiverse Arena v0.9.7 — Mutant Uprising

Mobile-first 1v1 fighting game built around iPad/tablet touch play, with responsive iPhone and desktop layouts.

## Current release

v0.9.7 is the first major content expansion after the v0.9.6 premium/polish cycle. It adds **Phase 3 — Mutant Uprising** while preserving the proven canonical combat source, save key, touch controls, results flow and the v0.9.6.6 swipeable Gauntlet navigation design.

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
**Phase 3:** Sabretooth → Mystique → Juggernaut → Deadpool → Magneto

Phase 3 identities:
- **Sabretooth** — feral pressure, pounces, Apex Hunter and capped regeneration.
- **Mystique** — starts in her classic blue form, then transforms into the player’s selected fighter and mirrors its combat identity.
- **Juggernaut** — deliberately oversized premium model, damage-reducing armor and huge charge/punish windows.
- **Deadpool** — pistols, katanas, mobility, Healing Factor and one guaranteed Last Stand.
- **Magneto** — three-phase boss with shards, push/pull, shield, levitation, debris, barrage and Master of Magnetism.

Ultron and Prowler remain preserved in the project as standby encounters.

## Architecture
- Production entry point: `app/core/bootstrap-v096.js`
- Canonical generated combat core: `app/core/core-runtime-v0958.js`
- v0.9.7 gameplay transform: `build/v097/transform-v097.js`
- Save key: `fightArenaV08` — do not rename without an explicit migration
- Touch input: `touch-v0941.js`
- Combat cleanup/stability: `stability-v0941.js` + `polish-v09572.js`
- Current campaign: `campaign-v097.js`
- Current Gauntlet/release UI: `update-v097.js`
- Phase 3 models/effects: `mutant-v097.css`
- Premium presentation foundation: `premium-v096.css` + `premium-v096.js` + `premium-v096-final.css`

See `CORE_ARCHITECTURE.md` for the protected compatibility rules.

## Development rules
1. Preserve working combat, save, progression and touch behavior unless a release explicitly targets gameplay.
2. Do not reintroduce fight-path `MutationObserver` loops, recursive class feedback or per-frame DOM rebuild work.
3. Keep iPad/mobile performance as a release requirement.
4. Add or extend regression checks when fixing or expanding production gameplay.
5. Do not hand-edit the generated canonical combat core; change its source transforms and rebuild it instead.
6. New campaign phases must plug into the swipeable Gauntlet without bypassing progression or revealing classified future threats.

## Deployment
The repository deploys as a static site through the GitHub Pages workflow in `.github/workflows/pages.yml`. `index.html` loads the production bootstrap, which owns runtime load order and cache versioning. Release CI rebuilds the canonical combat artifact, runs regression checks and persists generated release files before Pages deployment.
