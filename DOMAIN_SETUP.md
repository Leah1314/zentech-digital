# ZenTech Domain Setup

Domain: `zentech-digital.com`

## Recommended Launch Path

Use Cloudflare Pages for the first public version. It is a good fit for this site because the ZenTech landing page is static HTML, CSS, JavaScript, and image assets.

## Cloudflare Pages Setup

1. Create or log into a Cloudflare account.
2. Go to `Workers & Pages` -> `Pages` -> `Create application`.
3. Choose direct upload if you want the fastest launch.
4. Upload the site files from this folder:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `robots.txt`
   - `sitemap.xml`
   - `assets/`
5. Create the Pages project with a name like `zentech-digital`.
6. Open the Pages project, go to `Custom domains`, and add:
   - `zentech-digital.com`
   - `www.zentech-digital.com`

## Namecheap DNS Setup

If Cloudflare asks you to change nameservers, use this path for the cleanest root-domain setup:

1. In Cloudflare, add `zentech-digital.com` as a website/zone.
2. Copy the two Cloudflare nameservers shown for your zone.
3. In Namecheap, go to `Domain List` -> `Manage` -> `Nameservers`.
4. Select `Custom DNS`.
5. Paste the two Cloudflare nameservers and save.

After nameservers update, Cloudflare Pages can attach the apex domain `zentech-digital.com` and issue SSL automatically.

## Alternative Namecheap Advanced DNS Path

If you do not want to move nameservers to Cloudflare yet, use a subdomain first:

1. In Cloudflare Pages, add `www.zentech-digital.com` as a custom domain.
2. In Namecheap, go to `Domain List` -> `Manage` -> `Advanced DNS`.
3. Add this record:

```text
Type: CNAME Record
Host: www
Value: zentech-digital.pages.dev
TTL: Automatic
```

4. Add a redirect from `zentech-digital.com` to `https://www.zentech-digital.com` in Namecheap or Cloudflare.

## DNS Timing

DNS changes may work in 30 minutes, but full propagation can take longer. If the site does not load immediately, wait and test again.

## Production Checklist

- Connect the lead form to the Google Apps Script endpoint in `script.js`.
- Confirm both `https://zentech-digital.com` and `https://www.zentech-digital.com` load.
- Confirm the browser shows a valid HTTPS certificate.
- Submit one test lead and verify it appears in the Google Sheet database.
