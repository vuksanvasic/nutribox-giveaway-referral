# Nutribox · Giveaway Referral Sistem

Referral mehanika za Nutribox giveaway (maj 2026). Svako ko se prijavi dobija lični `?r=CODE` link — ako neko ko se prijavi preko njegovog linka osvoji glavnu nagradu, osvaja i pošiljalac.

## Komponente

```
nutribox-giveaway-referral/
├── api/
│   └── signup.js              Vercel serverless POST /api/signup
├── dashboard/
│   └── index.html             Lični dashboard, učitava se sa ?t=TOKEN
├── supabase/
│   ├── schema.sql             Početna shema (signups tabela + gen_ref_code)
│   ├── mig-step-1-alter.sql   (placeholder za buduće alter-e)
│   ├── mig-step-2-create-signup.sql
│   ├── mig-step-3-get-dashboard.sql
│   ├── mig-step-4-get-leaderboard.sql
│   ├── mig-step-5-mask-emails.sql
│   └── migration-01-leaderboard.sql
├── webflow/
│   └── thankyou-embed.html    Paste u Webflow → thank-you stranicu
├── package.json
└── vercel.json
```

## Data flow

```
1. Korisnik popuni formu na  https://www.nutribox.rs/giveaway/maj-2026
   (forma stash-uje { email, name, ref } u sessionStorage["nb_signup"])

2. Forma redirect-uje na     https://www.nutribox.rs/giveaway/maj-2026-uspesna-prijava

3. Thank-you embed pročita stash → POST /api/signup
   (Vercel API kreira signup u Supabase-u, vraća { refCode, shareUrl, dashboardUrl })

4. Embed renderuje "Tvoj lični link" karticu sa Copy/WhatsApp/Viber/SMS prečicama
   + link na lični dashboard sa share counter-om i lestvicom

5. Pri sledećoj prijavi sa  /giveaway/maj-2026?r=CODE
   forma hvata CODE, šalje ga u stash → API zapisuje referred_by = CODE
   za nov signup. Referrer's count se povećava.
```

## Deploy uputstvo

### 1. Supabase setup

1. Idi na [supabase.com](https://supabase.com), napravi novi projekat pod **Vuksanovim nalogom**:
   - Project name: `nutribox-giveaway`
   - Region: `eu-central-1` (Frankfurt — najbliži Srbiji)
   - Database password: čuvaj na sigurnom mestu
2. Sačekaj da se projekat završi inicijalizaciju (1-2 min)
3. Iz Project Settings → API → kopiraj:
   - **Project URL** (npr. `https://abcdef.supabase.co`)
   - **anon public key** (za dashboard)
   - **service_role secret key** (za Vercel API — **nikad ne expose-uj klijentu**)
4. Otvori SQL Editor i pokreni migracije po redosledu:
   - `supabase/schema.sql` (jednim klikom Run)
   - `supabase/mig-step-2-create-signup.sql`
   - `supabase/mig-step-3-get-dashboard.sql`
   - `supabase/mig-step-4-get-leaderboard.sql`
   - `supabase/mig-step-5-mask-emails.sql`

   ⚠️  Pokretaj migracije **jednu po jednu** — Supabase SQL Editor ne sme dve `plpgsql` funkcije u istom run-u.

### 2. Vercel deploy

1. Push folder na GitHub kao public ili private repo (npr. `nutribox-giveaway-referral`)
2. Idi na [vercel.com](https://vercel.com), import repo pod **Vuksanovim nalogom**
3. Framework Preset: **Other** (Vercel će automatski detektovati `vercel.json`)
4. **Environment Variables** (Settings → Environment Variables):
   - `SUPABASE_URL` = (iz koraka 1)
   - `SUPABASE_SERVICE_ROLE_KEY` = (iz koraka 1, secret!)
   - `WEBINAR_LANDING_URL` = `https://www.nutribox.rs/giveaway/maj-2026`
   - `DASHBOARD_BASE_URL` = (Vercel deploy URL, npr. `https://nutribox-giveaway-referral.vercel.app`)
5. Deploy. Sačekaj 1 min.
6. Vercel će ti dati production URL (npr. `https://nutribox-giveaway-referral.vercel.app`). To je ujedno i **dashboard URL** — kad korisnik klikne na lični link iz emaila/embed-a, ide tamo.

### 3. Update Webflow embed

Otvori `webflow/thankyou-embed.html`, pronađi `var CONFIG` i zameni placeholder-e:

```js
var CONFIG = {
  apiUrl: 'https://nutribox-giveaway-referral.vercel.app/api/signup',
  webinarUrl: 'https://www.nutribox.rs/giveaway/maj-2026',
  dashboardBaseUrl: 'https://nutribox-giveaway-referral.vercel.app'
};
```

Zatim u Webflow Designer-u otvori stranicu `https://www.nutribox.rs/giveaway/maj-2026-uspesna-prijava`, dodaj **Embed Code** element, paste-uj sadržaj `thankyou-embed.html` → Publish.

### 4. Update dashboard sa Supabase credentials

Otvori `dashboard/index.html`, pronađi i zameni:

```js
const SUPABASE_URL = 'https://[your-project-ref].supabase.co';
const SUPABASE_ANON_KEY = '[your-supabase-anon-key]';
```

→ realne vrednosti iz koraka 1. Push, redeploy Vercel.

## Testiranje pre prave kampanje

1. **Demo mode dashboard**: otvori `https://[your-vercel].vercel.app/?demo=1` — pokazuje mock podatke (Marko Marković sa 3 prijave, leaderboard top 5)
2. **End-to-end test**:
   - Popuni formu sa testnim email-om
   - Proveri da redirect na thank-you radi
   - Proveri da se "Tvoj lični link" pojavi sa pravom ref kodom
   - Kopiraj link, otvori u private windowu, popuni formu drugim email-om
   - Vrati se na prvi dashboard — count treba da bude 1
3. **Reset signups pre lansiranja**: u Supabase SQL Editor:
   ```sql
   DELETE FROM signups;
   ```

## Po čemu se razlikuje od Naučidizajn-a

- **Bez Kit/ConvertKit integracije** — Nutribox koristi samo Make webhook za CRM sync, Kit nije potreban
- **Nutribox vizuelni brending** — Instrument Sans, zeleni `#317039`, asimetrični radius `10px 3px`, off-white pozadina
- **Drugi sessionStorage key** — `nb_signup` umesto `nd_signup`, `nb_ref` umesto `nd_ref`
- **Drugi class prefiks** — `nb-ref-*` umesto `nd-ref-*` (nema CSS sudaranja ako se ikad oba embed-a nađu na istoj stranici)
- **Telefon u E.164** — Forma šalje pre-formatted phone, nema dodatnog processing-a na API-ju
- **Bez Kit winner tag mehanike** — referrer ne dobija auto-tag posle N prijava (može se dodati kasnije)
