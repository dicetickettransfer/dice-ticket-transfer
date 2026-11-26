# DICE Ticket Transfer

Static wallet viewer for shareable DICE ticket links. Hosted for free on GitHub Pages — no server required.

## Deploy (one-time)

1. Create a **public** GitHub repository named `dice-ticket-transfer`.
2. Upload the files in this folder to the repo root (`index.html`, `wallet.html`, `payload.js`).
3. GitHub → **Settings** → **Pages** → Source: **Deploy from a branch** → `main` / `/ (root)`.
4. Your site will be at:
   `https://<your-github-username>.github.io/dice-ticket-transfer/`
5. Paste that URL into the Chrome extension settings as **Viewer base URL**.

Friends can reuse the same Pages URL; they only need the extension + their own Discord webhook.

## Link format

```
https://<user>.github.io/dice-ticket-transfer/wallet.html#v1.<base64url-json>
```

Ticket data lives entirely in the URL hash (never uploaded to a server).
