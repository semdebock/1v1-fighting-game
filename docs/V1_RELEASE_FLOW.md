# Multiverse Arena V1.0 Release Flow

## Branch policy
- `dev`: all new features, migrations and fixes land here first.
- `main`: public/stable build only.
- No direct feature work on `main`.

## Required gates before merge to main
1. Static Dev Smoke Tests: green.
2. Browser Gameplay Smoke: green.
3. Production Repo Audit: green.
4. Dev preview manually checked on iPhone/iPad Safari and desktop browser.
5. No critical entries in the in-game error logger.
6. Character validation returns no invalid release fighters.
7. Combat invariant checks report valid player/enemy state.
8. Save migration tested with an older save and backup restore checked.
9. Experimental feature flags remain OFF unless explicitly approved for release.
10. Build badge/metadata matches the commit being tested.

## Release sequence
`dev -> automated tests -> dev preview -> manual play test -> PR -> automated tests -> merge main -> public deploy -> production smoke test`

## Rollback
If production breaks, revert the release merge on `main` to the last known-good commit. Do not patch multiple unrelated fixes directly into production.

## V1.0 manual play checklist
- Home/menu renders and navigation works.
- Collection and character selection work.
- Training starts and resets.
- Campaign fight starts.
- Movement, jump, block, punch, kick and special respond.
- Damage and HP bars update correctly.
- Pause/resume/restart work.
- Win/loss result flow appears once.
- Rewards/save persist after reload.
- Owner tools stay hidden for normal players.
- Mobile layout is usable in intended orientation.
- No uncaught errors during a complete match.
