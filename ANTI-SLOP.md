# Anti-slop checks

Run `npm ci --ignore-scripts` and `npm run lint` with Node 24 or newer.
The existing runtime engine range and `npm test` command remain in place.
The separate GitHub Actions workflow runs lint on Node 24; the historical
Travis Node 0.8/0.10 test matrix remains unchanged.

All 18 generic upstream rules and `oxc/no-accumulating-spread` run as errors
over generator code, tests, and new JavaScript/TypeScript outside ignored paths.
Built-in correctness rules are disabled in this additional check; the existing
JSHint settings and tests remain available. Effect rules do not apply.

`templates/**` contains EJS input, including `<% ... %>` directives outside
strings. Oxlint cannot parse those templates directly. This rollout does not
claim coverage of generated applications or rendered template variants.
Vendored rules, dependencies, and agent tooling are excluded.

The plugin is copied without modifications from the requested upstream.
See `tools/oxlint/anti-slop/UPSTREAM.md` for its pinned source and licenses.
Existing findings remain enabled and require a separate source cleanup.
