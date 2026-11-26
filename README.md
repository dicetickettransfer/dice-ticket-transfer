# DICE Ticket Transfer

Static wallet viewer for shareable DICE ticket links. Hosted for free on GitHub Pages — no server required.

## Live site

- Repo: https://github.com/dicetickettransfer/dice-ticket-transfer
- Pages: https://dicetickettransfer.github.io/dice-ticket-transfer/

Paste that Pages URL into the Chrome extension as **Viewer base URL** (the extension defaults to it).

Friends can reuse the same Pages URL; they only need the extension + their own Discord webhook.

## Redeploy

Push to `main` after editing files in this folder:

```bash
git add -A && git commit -m "Update viewer" && git push
```

## Link format

```
https://<user>.github.io/dice-ticket-transfer/wallet.html#v1.<base64url-json>
```

Ticket data lives entirely in the URL hash (never uploaded to a server).
