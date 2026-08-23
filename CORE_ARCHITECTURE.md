# Multiverse Arena — Clean Core Architecture

## Production core

The live game uses one production JavaScript entry point:

- `app/core/bootstrap-v096.js`

`index.html` does not own the historical runtime chain directly. The bootstrap owns load order, cache versioning, runtime health, release branding and compatibility boundaries. The generated canonical combat artifact remains `app/core/core-runtime-v0958.js` and still preserves the proven v0.9.5.7 source behavior beneath later controlled transforms.

## Protected compatibility systems

These remain protected unless a release explicitly targets them:

- Save key: `fightArenaV08`
- Canonical combat artifact: `app/core/core-runtime-v0958.js`
- Device bridge: `device-v092.js`
- Mobile/touch controls: `touch-v0941.js`
- Combat stability: `stability-v0941.js`
- Premium UI interactions/SFX: `ui-v09571.js`
- Combat polish/stability layer: `polish-v09572.js`
- Premium presentation foundation: `premium-v096.css`, `premium-v096-final.css`, `premium-v096.js`
- Historical character/villain transform chain through `build/v0962/transform-v0962.js`

The transform chain is a build compatibility layer. It generates the canonical combat core instead of exposing transforms as production script tags.

## v0.9.7 Mutant Uprising boundary

v0.9.7 is an explicit gameplay/content release. Its new production layers are:

- `build/v097/transform-v097.js` — adds the five Phase 3 enemies and combat logic to the generated core.
- `campaign-v097.js` — current 20-fight campaign data, Phase 3 progression and compatibility alias for older navigator consumers.
- `update-v097.js` — current swipeable Gauntlet navigator, release branding and compact Update Log.
- `mutant-v097.css` — premium Phase 3 villain models, telegraphs and attack effects.

The canonical core filename is intentionally unchanged so production load architecture stays stable. `build/v0958/build-core-v0958.js` now applies the v0.9.7 transform after the proven v0.9.6.2 Primo patch and records `patch: 0.9.7` in core metadata.

### Phase 3 protected gameplay identities

- **Sabretooth:** high aggression, Predator Leap/Savage Rush/Apex Hunter and capped regeneration.
- **Mystique:** classic blue starting model, temporary morph invulnerability, mid-fight transformation into the currently selected player fighter and mirror attacks.
- **Juggernaut:** deliberately oversized model, persistent damage-reducing armor and readable post-commit punish windows.
- **Deadpool:** mixed ranged/melee pressure, capped Healing Factor and exactly one Last Stand revive.
- **Magneto:** three HP-based boss phases with push, pull, shields, levitation, debris, barrage and Master of Magnetism.

Future changes to these mechanics should update `build/v097/release-check-v097.js` rather than silently altering their identities.

## Gauntlet compatibility

v0.9.7 preserves the v0.9.6.6 navigation concept: phase tabs, native horizontal swipe/scroll-snap, current-target auto-focus, replay of cleared fights and classified unreached threats. The old `update-v0966.js` remains in the repository as historical/reference code but is not double-loaded in the v0.9.7 production bootstrap.

`campaign-v097.js` exports both `window.FightArenaCampaignV097` and the compatibility alias `window.FightArenaCampaignV0957`, allowing older stable UI code to read the current campaign shape without loading the obsolete campaign runtime.

## v0.9.6 Premium Presentation boundary

The premium presentation remains the visual foundation. Its original presentation-only rules still apply: premium foundation CSS must not change combat positions, health, damage, AI, rewards or save state. Phase-specific gameplay visuals such as `mutant-v097.css` may animate villain models and telegraphs because they belong to an explicit gameplay/content release.

The old broad UI screen observer remains removed. `ui-v09571.js` keeps only one narrow results-class observer for one-time victory reward audio; it does not observe the fight tree or run per-frame DOM rebuild work.

## Production vs QA

QA/build files remain in the repository and GitHub Actions but are not loaded by every player. Release CI rebuilds the generated core and validates both historical protections and the current release before Pages deployment.

## Rules from v0.9.7 onward

1. `index.html` loads one production bootstrap instead of accumulating patch script tags.
2. Do not rename the `fightArenaV08` save key without an explicit migration.
3. Do not hand-edit `app/core/core-runtime-v0958.js`; change transforms and rebuild it.
4. Do not reintroduce fight-path `MutationObserver` loops or per-frame DOM rebuild loops.
5. Preserve the combat-freeze regression protections in CI.
6. Every release must validate Doctor Octopus, Punisher unlock/save migration, El Primo’s leap-and-smash, touch/multi-touch controls and results flow.
7. v0.9.7+ releases must also validate all five Mutant Uprising enemies and the Phase 3 order.
8. Gauntlet navigation may reveal only cleared fights and the current target; future threats remain classified.
9. Legacy transforms may only be deleted after generated behavior exists in a canonical module and parity checks pass.
10. Refactors keep gameplay behavior identical unless the release explicitly targets gameplay/balance.
11. Tablet/iPad combat must avoid unnecessary blur, uncontrolled observers and layout work on the live fight path.

## Next cleanup stages

- Consolidate CSS entry points behind a style manifest/bundle.
- Split canonical systems into `combat/`, `fighters/`, `villains/`, `gauntlet/`, `ui/`, `audio/` and `save/` modules.
- Move the generated core away from the historical `v0958` filename only through an explicit migration release.
- Delete legacy compatibility files only after automated parity checks prove they are redundant.
- Add browser-level smoke tests for menu navigation, a training round, Mystique transformation and one full Phase 3 result flow.
