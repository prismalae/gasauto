# Original media

Untouched originals from the workshop (WhatsApp exports).

These live **outside `public/`** on purpose: anything under `public/` is served
publicly and shipped on every deploy, and these originals total ~47 MB while the
site only uses the derived files in `public/media` (~5 MB).

Keep them here as the source of truth. To regenerate the web versions, re-run
the resize step — long edge capped, quality 82, progressive JPEG — and drop the
results into `public/media`, then reference them from `content/media.ts`.
