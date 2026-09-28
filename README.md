# Handyman Quote & Invoice Maker

A free, offline-first Progressive Web App for South African handymen to create professional quotes and invoices.

- Add job items (description, quantity, price) with live, calculator-style totals and optional 15% VAT
- Switch between **Quote** and **Invoice** – each keeps its own numbering (QT-001, INV-001)
- Upload your logo, or your business initials are used as the logo
- Save a professional A4 PDF, generated on the device (no internet needed)
- Send the PDF through the phone's share sheet (WhatsApp, email, …) or send a WhatsApp text summary via wa.me
- Installable on Android and iPhone, works offline

Everything is stored locally on the device – no accounts, no server.

## Files

| File | Purpose |
|---|---|
| `index.html` | The whole app (HTML, CSS and JS inline) |
| `manifest.json` | PWA install details |
| `sw.js` | Service worker for offline use |
| `icon.svg`, `icon-192.png`, `icon-512.png` | App icons |

## Run locally

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.
