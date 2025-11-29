# Accessibility Review — May 2024

- Tool: axe DevTools (Chrome extension) + manual keyboard walkthrough
- Scope: `/`, `/counseling.html`, `/coaching.html`
- Result: **0 critical issues detected**

## Manual notes

- Skip link focuses the main landmark across pages.
- Interactive controls expose visible focus states and meet 2.2 AA target sizes.
- Motion respects `prefers-reduced-motion` by disabling transitions.

### Follow-up checklist

- Re-run axe after adding new components.
- Include captions/transcripts for any future embedded media.
