# Multiverse Arena — Clean Core Architecture

## v0.9.5.8 Core Cleanup

The live game now has one production JavaScript entry point:

- `app/core/bootstrap-v0958.js`

`index.html` no longer owns the historical runtime chain directly. The bootstrap owns load order, cache versioning, runtime health, release branding and compatibility boundaries.

## Protected compatibility systems

These are intentionally preserved during the cleanup because they are already tested in production:

- Save key: `fightArenaV08`
- Core combat build: `core-v0957.js`
- Device bridge: `device-v092.js`
- Mobile/touch controls: `touch-v0941.js`
- Combat stability: `stability-v0941.js`
- Villain Gauntlet: `campaign-v0957.js`
- Premium UI: `ui-v09571.js`
- Combat polish/stability layer: `polish-v09572.js`
- Character/villain transform history through `build/v0957/transform-v0957.js`

The transform chain remains a compatibility layer for now. It is loaded only by the clean bootstrap instead of being exposed as a long list of production script tags in `index.html`.

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

## Next cleanup stages

- Consolidate the transform chain into a generated canonical combat core.
- Consolidate CSS entry points behind a style manifest/bundle.
- Split canonical systems into `combat/`, `fighters/`, `villains/`, `gauntlet/`, `ui/`, `audio/` and `save/` modules.
- Delete legacy compatibility files only after automated parity checks prove they are redundant.
