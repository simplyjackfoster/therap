# Performance Baseline

This directory stores the latest Lighthouse Mobile results captured for key pages before deployment.

| Page | Performance | Accessibility | Best Practices | SEO | Date | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 0.94 | 1.00 | 1.00 | 1.00 | 2024-05-01 | Tested with Lighthouse 11 (mobile emulation). |
| `/counseling.html` | 0.92 | 1.00 | 1.00 | 1.00 | 2024-05-01 | Same settings as above. |
| `/coaching.html` | 0.91 | 1.00 | 1.00 | 1.00 | 2024-05-01 | Same settings as above. |

## How to update

1. From the project root, run `npm install` (once) and `npm run lighthouse` (see workflow configuration) to collect metrics.
2. Save the generated HTML reports in this folder, replacing the prior versions.
3. Update the table above with the new scores and date.
