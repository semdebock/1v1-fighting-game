# Multiverse Arena — Clean Core Architecture

## v0.9.5.8 Core Cleanup

The live game uses one production JavaScript entry point. In v0.9.6 that entry point is:

- `app/core/bootstrap-v096.js`

`index.html` no longer owns the historical runtime chain directly. The bootstrap owns load order, cache versioning, runtime health, release branding and compatibility boundaries. The generated canonical combat artifact remains `app/core/core-runtime-v0958.js` and still represents the proven v0.9.5.7 gameplay source.

## Protected compatibility systems

These are intentionally preserved because they are already tested in production:

- Save key: `fightArenaV08`
- Canonical combat artifact: `app/core/core-runtime-v0958.js`
- Device bridge: `device-v092.js`
- Mobile/touch controls: `touch-v0941.js`
- Combat stability: `stability-v0941.js`
- Villain Gauntlet: `campaign-v0957.js`
- Premium UI interactions/SFX: `ui-v09571.js`
- Combat polish/stability layer: `polish-v09572.js`
- Character/villain transform history through `build/v0957/transform-v0957.js`

The transform chain remains a build compatibility layer. It generates the canonical combat core instead of being exposed as a long list of production script tags in `index.html`.

## v0.9.6 Premium Presentation boundary

v0.9.6 is a presentation release, not a balance release. Its visual layers are:

- `premium-v096.css`
- `premium-v096-final.css`
- `premium-v096.js`

The final polish CSS is loaded once by `premium-v096.js`. It is intentionally limited to responsive layout, touch hover behavior, accessibility focus states and reduced-cost iPad/iPhone visual effects. It must not set fighter transforms, combat positions, health, damage, AI, rewards or save state.

The old broad UI screen observer was removed in the final v0.9.6 pass because `.screen.active` animation is already CSS-driven. `ui-v09571.js` keeps only one narrow results-class observer for one-time victory reward audio; it does not observe the fight tree or run per-frame work.

## Production vs QA

QA files remain in the repository and GitHub Actions, but are no longer loaded by every player. This reduces live runtime work and keeps validation where it belongs: release CI.

## Rules from v0.9.5.8 onward

1. `index.html` should load one production bootstrap instead of accumulating new JavaScript patch tags.
2. New runtime systems should be registered through the clean bootstrap or a future canonical module directory.
3. Do not rename the `fightArenaV08` save key without an explicit migration.
4. Do not reintroduce fight-path `MutationObserver` loops or per-frame DOM rebuild loops.
5. Preserve the v0.9.5.7.2.2 combat-freeze regression guard in CI.
6. Every release must validate Doctor Octopus, Villain Gauntlet order, Punisher unlock/save migration, touch controls and results flow.
7. Legacy transforms may only be deleted after their generated behavior exists in a canonical core and parity checks pass.
8. Refactors must keep gameplay behavior identical unless the release is explicitly a gameplay/balance update.
9. Presentation releases must include a guard proving that presentation CSS does not rewrite fighter transforms.
10. Tablet/iPad combat must avoid unnecessary blur and broad DOM observers on the live fight path.

## Next cleanup stages

- Consolidate CSS entry points behind a style manifest/bundle.
- Split canonical systems into `combat/`, `fighters/`, `villains/`, `gauntlet/`, `ui/`, `audio/` and `save/` modules.
- Delete legacy compatibility files only after automated parity checks prove they are redundant.
- Add browser-level smoke tests for menu navigation, a training round and one full Villain Gauntlet result flow.
