# The A-Dot — Pre-Order Site

Dot cakes outta The A. Static pre-order site with zero paid services.

---

## Editing your config

**Open `app.js`.** At the very top is a `CONFIG` object. Every value you'd ever need to change is there — no need to touch anything else.

```js
const CONFIG = {
  phone: "4709080492",           // ← your number (digits only)
  phoneDisplay: "(470) 908-0492",// ← shown to customers
  pickupDay: "Saturday",
  pickupWindow: "8:00 AM – 12:30 PM",
  cutoffDay: "Friday",
  cutoffTime: "8 PM",
  cashAppHandle: "$niwi96",
  venmoHandle:   "@niwithleo",
  singlePrice: 8,
  breezePack:  { cups: 4,  price: 29 },
  hartsfield:  { cups: 12, price: 80 },
  cupsPerDrop: 175,
};
```

Save the file. Refresh the browser. Done.

---

## Running locally

No build step needed. Just open the folder:

```bash
# Option 1 — Python (built into macOS and most Linux)
cd the-a-dot
python3 -m http.server 8080
# then open http://localhost:8080 in your browser

# Option 2 — Node (if you have it)
npx serve .
```

Or just double-click `index.html` — it works as a plain file too.

---

## Deploying free to GitHub Pages (step-by-step)

These instructions assume you've never deployed a website before.

### Step 1 — Install Git (skip if you already have it)
Download from https://git-scm.com and install it.

### Step 2 — Create a free GitHub account
Go to https://github.com and sign up. Your username becomes part of the URL.

### Step 3 — Create a new repository

1. Click the **+** icon in the top-right → **New repository**
2. Name it `the-a-dot` (or anything you like)
3. Set it to **Public** (required for free GitHub Pages)
4. Leave everything else default and click **Create repository**

### Step 4 — Push your site files

Open a terminal in the `the-a-dot` folder and run these commands one at a time:

```bash
git init
git add index.html style.css app.js
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/the-a-dot.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

### Step 5 — Turn on GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu) → **Pages** (left sidebar)
3. Under "Source" select **Deploy from a branch**
4. Set the branch to **main** and folder to **/ (root)**
5. Click **Save**

After about 60 seconds your site will be live at:
```
https://YOUR-USERNAME.github.io/the-a-dot/
```

### Updating the site later

Every time you change a file, run:

```bash
git add index.html style.css app.js
git commit -m "Update prices" # or whatever you changed
git push
```

GitHub Pages will automatically redeploy within a minute or two.

---

## Test checklist

Tested before delivery:

- [x] **Pack steppers cap correctly** — Breeze Pack increments stop at 4 total; Hartsfield stops at 12 total. The + buttons on all colors disable once the pack is full.
- [x] **Pack button blocked until exact** — "Add Pack" is disabled (greyed out, pointer-events off) until the cup count equals the pack size exactly.
- [x] **Validation blocks bad orders:**
  - Empty cart → "Your cart is empty" error
  - Missing name → "Please enter your name" error
  - Missing or short phone → "Enter a valid 10-digit phone number" error
  - No payment method → "Pick a payment method" error
- [x] **Payment panel hidden until selection** — `#payInstructions` starts with `hidden` attribute; it only appears after a radio button is chosen.
- [x] **Dollar amount updates live** — Changing cart contents while checkout is open updates the total in the payment instructions immediately.
- [x] **SMS link pre-filled** — The "Text My Order" button constructs an `sms:` link with the full order summary in the body. Uses `&body=` on iOS and `?body=` on Android.
- [x] **Order code format** — Generated codes match `ADOT-XXXX` (4 alphanumeric chars, no ambiguous O/0/I/1).
- [x] **Clipboard copy fallback** — Uses `navigator.clipboard` with a `document.execCommand` fallback for older browsers.
- [x] **New Order resets everything** — Cart, pack drafts, form fields, payment selection, and all error messages all clear.
- [x] **Reduced-motion respected** — CSS `prefers-reduced-motion` media query disables the ticker scroll animation and all other transitions.
- [x] **Keyboard navigation** — All interactive elements reachable by Tab; focus states visible (3px blue outline).
- [x] **Cart count badge** — Hides when 0, shows correct count after adding items, updates after removes.
- [x] **Savings shown on packs** — Each pack card shows the dollar savings vs. buying singles.
