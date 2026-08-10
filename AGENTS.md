# marmus-flowers

## Agent skills

### Issue tracker

Issues live as local markdown files under `.scratch/<feature>/` in this repo. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage labels are used as-is (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Design system

Візуал сайту описує дизайн-система Marmúr із Claude Design. Токени —
`apps/web/app/assets/css/design-system/` (не правити вручну), компоненти —
`apps/web/app/components/ds/`. Правила й відхилення: `docs/design-system.md`.

### Domain docs

Single-context: one `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
