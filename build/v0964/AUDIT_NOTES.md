# Multiverse Arena v0.9.6.4 audit notes

This release is a focused iPad/UI reliability pass based on live screenshots.

## Confirmed issues addressed
- Safari/iPad combat controls could extend below the visible viewport when a fighter had three hero abilities.
- The home fighter preview centered the preview container, but the actual fighter sprite remained offset inside that container.
- LIVE COMBAT could render twice because the premium screen label and the v0.9.6.3 control-row label both remained visible.
- Older v0.9.6/v0.9.6.2/v0.9.6.3 presentation layers could still write version-sensitive UI after a newer bootstrap had already branded the page.
- The legacy transient cleanup safety net did not know about newer boss FX or the v0.9.6.2 Primo Smash transient classes.

## Protected systems
- Save key `fightArenaV08`
- Canonical combat core and current damage/balance
- Villain Gauntlet progression
- Doctor Octopus and Phase 2
- Punisher unlock/result flow
- Touch controls and multi-touch guard
- v0.9.6.2 El Primo leap-and-smash behavior
