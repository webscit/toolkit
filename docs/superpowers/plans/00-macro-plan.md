# @webscit/toolkit — Macro Implementation Plan

**Spec:** [2026-04-01-sci-ui-toolkit-design.md](../specs/2026-04-01-sci-ui-toolkit-design.md)

---

## Phases

| # | Phase | Deliverable | Depends On |
|---|---|---|---|
| 1 | Monorepo Scaffold | Working repo with all tooling configured | — |
| 2 | Design Token System | `packages/tokens` — CSS, Figma, Penpot outputs | 1 |
| 3 | Core Components | 17 components in `packages/registry` | 2 |
| 4 | Registry & CLI | Hosted registry manifest + thin CLI wrapper + GitHub Actions deploy | 3 |
| 5 | Documentation | Storybook with all components documented | 3 |

---

## Detailed Plans

- [Phase 1 — Monorepo Scaffold](./01-monorepo-scaffold.md)
- [Phase 2 — Design Token System](./02-design-token-system.md)
- [Phase 3 — Core Components](./03-core-components.md)
- [Phase 4 — Registry & CLI](./04-registry-and-cli.md)
- [Phase 5 — Documentation](./05-documentation.md)
