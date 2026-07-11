# ZenTech Domain Setup

Domain: `zentech-digital.com`

Production preview URL:

https://zentech-digital.leah-1314.chatgpt.site

## Exact DNS Records For Namecheap

Add these in Namecheap under `Domain List` -> `Manage` -> `Advanced DNS` -> `Host Records`.

Remove any conflicting existing records for `@` or `www` first, especially parking records, URL redirects, or old A/CNAME records.

```text
Type: A Record
Host: @
Value: 162.159.143.30
TTL: Automatic
```

```text
Type: A Record
Host: @
Value: 172.66.3.26
TTL: Automatic
```

```text
Type: CNAME Record
Host: www
Value: custom-domains.chatgpt.site
TTL: Automatic
```

```text
Type: TXT Record
Host: _openai-site-verification
Value: openai-site-verification=2oUjr63LG969i_801ZkI2DZH4Zecy_qpErezJrFSnrg
TTL: Automatic
```

```text
Type: TXT Record
Host: _cf-custom-hostname
Value: 69602152-4975-48d8-9fef-c690e942559c
TTL: Automatic
```

```text
Type: TXT Record
Host: _openai-site-verification.www
Value: openai-site-verification=HuXCWNARdZ6NYt3GybfFkrE3X4YlU3t6QioKJ5HsumE
TTL: Automatic
```

```text
Type: TXT Record
Host: _cf-custom-hostname.www
Value: 033622b0-8c4f-4d7e-a1db-4f24bb9374f7
TTL: Automatic
```

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
