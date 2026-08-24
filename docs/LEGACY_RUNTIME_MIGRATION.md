# Legacy runtime migration

The live game still contains versioned patch files from earlier releases. They remain active until their behavior has been moved into a named module and verified by smoke tests.

## Current load groups

The authoritative load order now lives in `app/config/runtime-manifest.js`.

- `platform` — device, touch and stability compatibility
- `campaign` — campaign integration
- `interface` — UI/polish/premium compatibility
- `legacyPatches` — historical update patches still required at runtime
- `ownerCompatibility` — temporary Owner Board compatibility layer

## Cleanup rule

Do not delete a versioned runtime file just because its version looks old. A patch may only be archived after:

1. Its active behavior is identified.
2. That behavior is moved into the appropriate modular system.
3. The legacy filename is removed from `runtime-manifest.js`.
4. `node tests/smoke-test.js` passes.
5. The dev preview is manually checked before merging to `main`.

## Next consolidation targets

1. Owner Board compatibility script -> `app/owner/*` and `app/ui/ownerboard.js`.
2. UI patch chain -> `app/ui/*`.
3. Hero/fighter patches -> `app/characters/*`.
4. Combat patches -> `app/combat/*`.

Old release-specific GitHub Actions are being removed as the unified `Dev Smoke Tests` workflow replaces them.
