/* ══════════════════════════════════════════════
   THE A-DOT — app.js
   ══════════════════════════════════════════════

   ┌──────────────────────────────────────────────┐
   │  OWNER CONFIG — edit only this block         │
   │  Everything else reads from here.            │
   └──────────────────────────────────────────────┘ */

const CONFIG = {
  // ── Business info ──────────────────────────────
  businessName: "The A-Dot",
  phone: "4709080492",           // digits only, no formatting
  phoneDisplay: "(470) 908-0492",

  // ── Pickup window ──────────────────────────────
  pickupDay: "Saturday",
  pickupWindow: "8:00 AM – 12:30 PM",

  // ── Weekly order cutoff ────────────────────────
  cutoffDay: "Friday",
  cutoffTime: "8 PM",

  // ── Payment handles ────────────────────────────
  cashAppHandle: "$niwi96",
  venmoHandle:   "@niwithleo",
  // Apple Cash uses the business phone number above

  // ── Prices ─────────────────────────────────────
  singlePrice: 8,    // dollars, per cup
  breezePack: {
    cups:  4,
    price: 29,
  },
  hartsfield: {
    cups:  12,
    price: 80,
  },

  // ── Scarcity limit (shown in ticker/hero) ──────
  cupsPerDrop: 175,

  // ── Google Sheet order logging ─────────────────
  // Paste your Apps Script web app URL here after following the
  // setup steps in google-apps-script.js. Leave "" to disable.
  sheetEndpoint: "https://script.google.com/macros/s/AKfycbxdF1OE3a4eXwqvwZIDqjzEnKRolsMW8flRwdIcQPLj0q4Ji0R5m8ex5QZfL6bsVGxqkA/exec",
};

/* ══════════════════════════════════════════════
   PRODUCT DEFINITIONS
   (names/descs reference CONFIG handles above)
   ══════════════════════════════════════════════ */

const SINGLES = [
  {
    id: "five-points",
    name: "The Five Points",
    desc: "Rainbow nonpareils — every MARTA line in one cup. The flagship.",
    color: "multi",
    dots: ["red","blue","gold","green"],
  },
  {
    id: "red-line",
    name: "The Red Line",
    desc: "All red dots. Bold, classic, can't miss.",
    color: "red",
    dots: ["red","red","red","red","red"],
  },
  {
    id: "blue-line",
    name: "The Blue Line",
    desc: "All blue dots. Clean, cool, consistent.",
    color: "blue",
    dots: ["blue","blue","blue","blue","blue"],
  },
  {
    id: "green-line",
    name: "The Green Line",
    desc: "All green dots. Fresh and unexpected.",
    color: "green",
    dots: ["green","green","green","green","green"],
  },
  {
    id: "gold-line",
    name: "The Gold Line",
    desc: "All gold dots. The newest route.",
    color: "gold",
    dots: ["gold","gold","gold","gold","gold"],
  },
];

const PACKS = [
  {
    id: "breeze",
    name: "The Breeze Pack",
    desc: `${CONFIG.breezePack.cups} cups. Mix any colors you want.`,
    cups: CONFIG.breezePack.cups,
    price: CONFIG.breezePack.price,
    savings: (CONFIG.singlePrice * CONFIG.breezePack.cups) - CONFIG.breezePack.price,
  },
  {
    id: "hartsfield",
    name: "The Hartsfield Dozen",
    desc: `${CONFIG.hartsfield.cups} cups. The full haul.`,
    cups: CONFIG.hartsfield.cups,
    price: CONFIG.hartsfield.price,
    savings: (CONFIG.singlePrice * CONFIG.hartsfield.cups) - CONFIG.hartsfield.price,
  },
];

const COLORS = [
  { id: "red",   label: "Red Line",   dotClass: "dot-red"   },
  { id: "blue",  label: "Blue Line",  dotClass: "dot-blue"  },
  { id: "gold",  label: "Gold Line",  dotClass: "dot-gold"  },
  { id: "green", label: "Green Line", dotClass: "dot-green" },
];

/* ══════════════════════════════════════════════
   CUP SVG ILLUSTRATION SYSTEM
   ══════════════════════════════════════════════ */

// Pre-computed dot positions scattered across the frosting dome
// (viewBox 0 0 180 200 — dome peaks at y=20, base at y=97)
const DOT_POSITIONS = [
  [84,32],[90,24],[96,32],                             // peak cluster
  [72,46],[82,40],[91,38],[100,40],[110,47],            // upper tier
  [58,58],[71,53],[84,50],[97,51],[110,54],[124,59],    // middle tier
  [50,70],[64,67],[78,63],[92,62],[106,65],[120,69],    // lower tier
  [57,82],[71,79],[85,77],[100,76],[115,80],[128,84],   // bottom band
];

const COLOR_HEX = {
  red:   '#CE242B',
  blue:  '#0076BF',
  gold:  '#F0A500',
  green: '#009A4E',
  empty: '#DDD5CC',
};

// MARTA accent color shown as the band on each cup
const LINE_ACCENT = {
  'five-points': '#F0A500',
  'red-line':    '#CE242B',
  'blue-line':   '#0076BF',
  'gold-line':   '#F0A500',
  'green-line':  '#009A4E',
};

function dotCakeSVG(dotColors, accentHex, svgId = 'cup') {
  const dots = DOT_POSITIONS.map((pos, i) => {
    const c = dotColors[i % dotColors.length];
    const fill = COLOR_HEX[c] || COLOR_HEX.empty;
    return `<circle cx="${pos[0]}" cy="${pos[1]}" r="5.5" fill="${fill}" stroke="rgba(0,0,0,0.17)" stroke-width="0.6"/>`;
  }).join('');

  return `<svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" class="cup-svg" aria-hidden="true">
  <defs>
    <clipPath id="dc${svgId}">
      <path d="M28,97 C28,90 40,68 58,48 C68,36 76,26 90,20 C104,26 112,36 122,48 C140,68 152,90 152,97 Z"/>
    </clipPath>
  </defs>
  <ellipse cx="91" cy="192" rx="56" ry="6" fill="rgba(42,26,18,0.13)"/>
  <path d="M28,97 L152,97 L136,183 L44,183 Z" fill="#FFF8F4" stroke="#2A1A12" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M28,97 L152,97 L147,114 L33,114 Z" fill="${accentHex}"/>
  <line x1="66"  y1="97" x2="60"  y2="180" stroke="rgba(42,26,18,0.07)" stroke-width="1"/>
  <line x1="90"  y1="97" x2="90"  y2="180" stroke="rgba(42,26,18,0.07)" stroke-width="1"/>
  <line x1="114" y1="97" x2="120" y2="180" stroke="rgba(42,26,18,0.07)" stroke-width="1"/>
  <line x1="44"  y1="177" x2="136" y2="177" stroke="rgba(42,26,18,0.18)" stroke-width="1.5"/>
  <path d="M28,97 C28,90 40,68 58,48 C68,36 76,26 90,20 C104,26 112,36 122,48 C140,68 152,90 152,97 Z" fill="#FFFAF7" stroke="#2A1A12" stroke-width="2.5"/>
  <path d="M46,84 Q68,72 90,70 Q112,72 134,84" fill="none" stroke="#EDE5DD" stroke-width="2" stroke-linecap="round"/>
  <path d="M36,92 Q60,78 90,76 Q120,78 144,92" fill="none" stroke="#EDE5DD" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M90,20 C87,11 90,5 90,5 C90,5 93,11 90,20" fill="#FFFAF7" stroke="#2A1A12" stroke-width="2"/>
  <path d="M34,92 C42,84 52,68 64,54 C72,42 78,33 84,26 C80,34 73,48 64,64 C56,76 44,86 34,92 Z" fill="rgba(255,255,255,0.45)"/>
  <g clip-path="url(#dc${svgId})">${dots}</g>
</svg>`;
}

// Convert a pack draft {red,blue,gold,green} into a color array for dotCakeSVG
function draftColorArray(draft, total) {
  const n = DOT_POSITIONS.length;
  if (total === 0) return Array(n).fill('empty');
  const arr = [];
  for (const [color, count] of Object.entries(draft)) {
    const slots = Math.round(count / total * n);
    for (let i = 0; i < slots; i++) arr.push(color);
  }
  const dominant = Object.entries(draft).sort((a, b) => b[1] - a[1])[0]?.[0] || 'empty';
  while (arr.length < n) arr.push(dominant);
  return arr.slice(0, n);
}

const FAQ_ITEMS = [
  {
    q: "What's a dot cake?",
    a: "An 8 oz cup of vanilla funfetti cake and frosting, topped with colored nonpareils — the little round sprinkles. Each cup is a single serving. The colors match MARTA transit lines because we're built by someone who actually rides.",
  },
  {
    q: "When and where is pickup?",
    a: `${CONFIG.pickupDay}s, ${CONFIG.pickupWindow}. The pickup address is texted to you after payment clears — we don't post it publicly. Atlanta, GA only.`,
  },
  {
    q: "Is this pre-order only?",
    a: "Yes. Always. We bake fresh Friday night for Saturday pickup. There are no walk-ups, no day-of orders, and no delivery. If you haven't pre-ordered and paid by Friday 8 PM, there's nothing to pick up.",
  },
  {
    q: "How do I pay?",
    a: `Cash App (${CONFIG.cashAppHandle}), Venmo (${CONFIG.venmoHandle}), or Apple Cash (${CONFIG.phoneDisplay}). You pay when you order — not at pickup. Include your order code in the payment note. Payment must clear by ${CONFIG.cutoffDay} ${CONFIG.cutoffTime} or your order won't be baked.`,
  },
  {
    q: "Do you deliver?",
    a: "No. Pickup only. Atlanta, GA only. The address is sent after payment clears.",
  },
  {
    q: "Can I mix colors in a pack?",
    a: "That's the whole point. Pick any combination of Red, Blue, Gold, and Green Line cups to fill your pack. The stepper won't let you add the pack until it's exactly full.",
  },
  {
    q: "What are the ingredients? Any allergens?",
    a: "Vanilla funfetti cake, frosting, and nonpareils. Contains wheat, eggs, milk, and soy. Made in a home kitchen that also handles tree nuts and peanuts. If you have severe allergies, please factor that in.",
  },
  {
    q: "How long do they keep?",
    a: "Best same day. Refrigerate in the cup and they'll hold for 2–3 days. Bring to room temp for about 20 minutes before eating.",
  },
  {
    q: "Why MARTA line names?",
    a: "Built by somebody who actually rides MARTA. It felt right.",
  },
];

const TERMS_HTML = `
<p><strong>Pre-orders only.</strong> All orders must be placed and paid online before the ${CONFIG.cutoffDay} ${CONFIG.cutoffTime} cutoff. No day-of orders, walk-ups, or cash at pickup.</p>
<p><strong>Pickup window.</strong> ${CONFIG.pickupDay}s, ${CONFIG.pickupWindow}. Pickup address is texted after payment clears. Orders not collected by 12:30 PM are forfeited without refund.</p>
<p><strong>Payment.</strong> All orders are prepaid via Cash App, Venmo, or Apple Cash. Your order code must appear in the payment note. Payment must clear by ${CONFIG.cutoffDay} ${CONFIG.cutoffTime}. Unpaid orders will not be baked.</p>
<p><strong>Order confirmation.</strong> An order is only final once you receive our confirmation text, normally within 30–60 minutes of payment clearing.</p>
<p><strong>All sales final.</strong> Once confirmed, orders are non-refundable. If we are unable to fulfill your order, you will receive a full refund.</p>
<p><strong>Allergens.</strong> Products contain wheat, eggs, milk, and soy. Made in a home kitchen that also handles tree nuts and peanuts.</p>
<p><strong>Georgia Cottage Food Notice.</strong> These products are made in a home kitchen not inspected by a state or local government agency. They are sold and delivered directly to consumers in Georgia only.</p>
<p><strong>Pricing.</strong> Prices are subject to change between weekly drops. The price at the time of your order is the price you pay.</p>
`;

/* ══════════════════════════════════════════════
   STATE
   ══════════════════════════════════════════════ */

let cart = [];   // Array of cart item objects
let packDraft = {};  // { packId: { red:0, blue:0, gold:0, green:0 } }

/* ══════════════════════════════════════════════
   DOM HELPERS
   ══════════════════════════════════════════════ */

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function show(el)  { if (el) el.hidden = false; }
function hide(el)  { if (el) el.hidden = true; }

/* ══════════════════════════════════════════════
   VIEW SWITCHING
   ══════════════════════════════════════════════ */

function showView(name) {
  $$('.view').forEach(v => { v.classList.remove('active'); v.hidden = true; });
  $$('.nav-btn').forEach(b => b.classList.remove('active'));
  const view = $(`#view-${name}`);
  if (view) { view.classList.add('active'); view.hidden = false; }
  // Keep "Order" nav button active for checkout and confirm views
  const navName = (name === 'checkout' || name === 'confirm') ? 'home' : name;
  const btn = $(`[data-view="${navName}"]`);
  if (btn) btn.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ══════════════════════════════════════════════
   RENDER — MENU
   ══════════════════════════════════════════════ */

function renderSingles() {
  const grid = $('#singlesGrid');
  if (!grid) return;
  grid.innerHTML = SINGLES.map(p => {
    const accentHex = LINE_ACCENT[p.id] || '#F0A500';
    const svg = dotCakeSVG(p.dots, accentHex, p.id);
    return `
    <div class="product-card" data-color="${p.color}">
      <div class="product-card-visual card-bg-${p.color}">
        ${svg}
      </div>
      <div class="product-card-body">
        <div class="product-card-header">
          <span class="product-card-name">${p.name}</span>
          <span class="product-card-price">$${CONFIG.singlePrice}</span>
        </div>
        <p class="product-card-desc">${p.desc}</p>
        <button
          class="btn btn-primary add-single-btn"
          data-single-id="${p.id}"
          aria-label="Add ${p.name} to cart, $${CONFIG.singlePrice}">
          Add to Cart
        </button>
      </div>
    </div>`;
  }).join('');
}

function renderPacks() {
  const grid = $('#packsGrid');
  if (!grid) return;
  grid.innerHTML = PACKS.map(pk => {
    const draft = getPackDraft(pk.id);
    const total = sumDraft(draft);
    const pct   = Math.min(100, (total / pk.cups) * 100);
    const exact = total === pk.cups;
    const over  = total > pk.cups;
    const colors = draftColorArray(draft, total);
    // Pack cup accent: mix gold if empty, or dominant color
    const dominantColor = total > 0
      ? Object.entries(draft).sort((a,b) => b[1]-a[1])[0][0]
      : 'empty';
    const packAccent = total > 0 ? (COLOR_HEX[dominantColor] || '#F0A500') : '#555';
    const svg = dotCakeSVG(colors, packAccent, pk.id);

    return `
    <div class="product-card product-card-pack" data-color="pack" data-pack-id="${pk.id}">
      <div class="product-card-visual card-bg-pack">
        ${svg}
        <div class="pack-cup-label">${total > 0 ? `${total}/${pk.cups} cups` : `${pk.cups} cups`}</div>
      </div>
      <div class="product-card-body">
        <div class="product-card-header">
          <span class="product-card-name">${pk.name}</span>
          <span class="product-card-price">$${pk.price}</span>
        </div>
        <p class="product-card-desc">${pk.desc} <span class="savings-tag">Save $${pk.savings}</span></p>

        <div class="pack-builder" aria-label="${pk.name} color builder">
          ${COLORS.map(c => `
            <div class="pack-color-row">
              <span class="pack-color-label">
                <span class="dot ${c.dotClass}" aria-hidden="true"></span>
                ${c.label}
              </span>
              <div class="stepper" role="group" aria-label="${c.label} quantity">
                <button class="stepper-btn"
                  data-pack="${pk.id}" data-color="${c.id}" data-action="dec"
                  aria-label="Remove one ${c.label}"
                  ${draft[c.id] === 0 ? 'disabled' : ''}>−</button>
                <span class="stepper-val" aria-live="polite">${draft[c.id]}</span>
                <button class="stepper-btn"
                  data-pack="${pk.id}" data-color="${c.id}" data-action="inc"
                  aria-label="Add one ${c.label}"
                  ${total >= pk.cups ? 'disabled' : ''}>+</button>
              </div>
            </div>
          `).join('')}

          <div class="pack-progress" aria-hidden="true">
            <div class="pack-progress-bar" style="width:${pct}%"></div>
          </div>
          <p class="pack-status ${exact ? 'exact' : over ? 'over' : ''}" aria-live="polite">
            ${exact ? `Pack full! ✓` : over ? `Too many — remove ${total - pk.cups}` : `${total} of ${pk.cups} cups chosen`}
          </p>
        </div>

        <button class="btn btn-primary add-pack-btn"
          data-pack-id="${pk.id}"
          aria-label="Add ${pk.name} to cart"
          ${!exact ? 'disabled' : ''}>
          ${exact ? `Add Pack — $${pk.price}` : `Choose all ${pk.cups} cups to add`}
        </button>
      </div>
    </div>`;
  }).join('');
}

function getPackDraft(packId) {
  if (!packDraft[packId]) {
    packDraft[packId] = { red: 0, blue: 0, gold: 0, green: 0 };
  }
  return packDraft[packId];
}

function sumDraft(draft) {
  return Object.values(draft).reduce((a, b) => a + b, 0);
}

/* ══════════════════════════════════════════════
   RENDER — CART
   ══════════════════════════════════════════════ */

function cartTotal() {
  return cart.reduce((s, item) => s + item.price, 0);
}

function cartItemCount() {
  return cart.reduce((s, item) => s + (item.type === 'single' ? 1 : item.cups), 0);
}

function buildCartItemHTML(item) {
  const colorBreakdown = item.type === 'pack'
    ? `<span class="cart-item-detail">${
        COLORS.filter(c => item.colors[c.id] > 0)
              .map(c => `${item.colors[c.id]}× ${c.label}`)
              .join(' · ')
      }</span>`
    : '';
  return `
    <div class="cart-item" data-cart-id="${item.id}">
      <div class="cart-item-top">
        <span class="cart-item-name">${item.name}</span>
        <span class="cart-item-price">$${item.price}</span>
      </div>
      ${colorBreakdown}
      <button class="cart-item-remove" data-remove-id="${item.id}" aria-label="Remove ${item.name} from cart">
        Remove
      </button>
    </div>
  `;
}

function renderCart() {
  const empty   = $('#cartEmpty');
  const items   = $('#cartItems');
  const summary = $('#cartSummary');
  const total   = $('#cartTotal');

  if (!items) return;

  if (cart.length === 0) {
    show(empty);
    items.innerHTML = '';
    hide(summary);
  } else {
    hide(empty);
    items.innerHTML = cart.map(buildCartItemHTML).join('');
    show(summary);
    if (total) total.textContent = `$${cartTotal()}`;
  }

  renderCartDrawer();
  updateCartCount();
  updateCheckoutTotal();
}

function renderCartDrawer() {
  const body   = $('#drawerBody');
  const footer = $('#drawerFooter');
  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = '<p class="cart-empty">Nothing here yet.</p>';
    footer.innerHTML = '';
    return;
  }
  body.innerHTML   = cart.map(buildCartItemHTML).join('');
  footer.innerHTML = `
    <div class="drawer-total-row"><span>Total</span><strong>$${cartTotal()}</strong></div>
    <button class="btn btn-primary btn-full" id="drawerCheckoutBtn">Checkout →</button>
    <button class="btn btn-ghost btn-full" id="drawerCloseFooter">Continue Shopping</button>
  `;
  $('#drawerCheckoutBtn')?.addEventListener('click', () => { closeDrawer(); goToCheckout(); });
  $('#drawerCloseFooter')?.addEventListener('click', closeDrawer);
}

function updateCartCount() {
  const count = cartItemCount();
  const el = $('#cartCount');
  if (el) {
    el.textContent = count;
    el.dataset.zero = count === 0 ? 'true' : 'false';
  }
  const btn = $('#cartBtn');
  if (btn) btn.setAttribute('aria-label', `Open cart, ${count} item${count !== 1 ? 's' : ''}`);
}

function updateCheckoutTotal() {
  const el = $('#checkoutTotal');
  if (el) el.textContent = `$${cartTotal()}`;
  renderPaymentPreview();
}

/* ══════════════════════════════════════════════
   CART ACTIONS
   ══════════════════════════════════════════════ */

function genId() {
  return Math.random().toString(36).slice(2, 8);
}

function addSingle(productId) {
  const p = SINGLES.find(s => s.id === productId);
  if (!p) return;
  cart.push({
    id:    genId(),
    type:  'single',
    name:  p.name,
    price: CONFIG.singlePrice,
    productId: p.id,
  });
  renderCart();
  flashCartBtn();
}

function addPack(packId) {
  const pk = PACKS.find(p => p.id === packId);
  if (!pk) return;
  const draft = getPackDraft(packId);
  if (sumDraft(draft) !== pk.cups) return;

  cart.push({
    id:     genId(),
    type:   'pack',
    name:   pk.name,
    cups:   pk.cups,
    price:  pk.price,
    colors: { ...draft },
  });

  // Reset draft
  packDraft[packId] = { red: 0, blue: 0, gold: 0, green: 0 };
  renderPacks();
  renderCart();
  flashCartBtn();
}

function removeCartItem(cartId) {
  cart = cart.filter(i => i.id !== cartId);
  renderCart();
  renderCartDrawer();
}

function flashCartBtn() {
  const btn = $('#cartBtn');
  if (!btn) return;
  btn.style.transform = 'scale(1.2)';
  setTimeout(() => { btn.style.transform = ''; }, 200);
}

/* ══════════════════════════════════════════════
   CART DRAWER
   ══════════════════════════════════════════════ */

function openDrawer() {
  const drawer  = $('#cartDrawer');
  const overlay = $('#cartOverlay');
  drawer.classList.add('open');
  overlay.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  overlay.setAttribute('aria-hidden', 'false');
  renderCartDrawer();
  $('#drawerClose')?.focus();
}

function closeDrawer() {
  const drawer  = $('#cartDrawer');
  const overlay = $('#cartOverlay');
  drawer.classList.remove('open');
  overlay.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  overlay.setAttribute('aria-hidden', 'true');
}

/* ══════════════════════════════════════════════
   CHECKOUT
   ══════════════════════════════════════════════ */

function goToCheckout() {
  if (cart.length === 0) { showToast("Add something to your cart first."); return; }
  closeDrawer();
  showView('checkout');
  updateCheckoutTotal();
  $('#custName')?.focus();
}

function goBackToCart() {
  showView('home');
}

/* Simple payment preview shown during checkout (before order code exists) */
function renderPaymentPreview() {
  const panel   = $('#payPreview');
  const text    = $('#payPreviewText');
  const checked = $('input[name="payMethod"]:checked');
  if (!panel || !text) return;

  if (!checked) { hide(panel); return; }

  const method = checked.value;
  const total  = cartTotal();
  const previews = {
    cashapp:  `You'll send <strong>$${total}</strong> to <span class="pay-handle">${CONFIG.cashAppHandle}</span> on Cash App. After placing your order you'll get a direct link — order code pre-filled.`,
    venmo:    `You'll send <strong>$${total}</strong> to <span class="pay-handle">${CONFIG.venmoHandle}</span> on Venmo. After placing your order you'll get a direct link — order code pre-filled.`,
    applepay: `You'll send <strong>$${total}</strong> via Apple Cash inside the Messages thread. After texting your order, tap <strong>+</strong> → Apple Cash to pay.`,
  };
  text.innerHTML = previews[method] || '';
  show(panel);
}

/* Build Cash App / Venmo deep links */
function buildPayLink(method, total, code) {
  if (method === 'cashapp') {
    // cash.app/$handle/amount — opens directly to pay this person
    return `https://cash.app/${CONFIG.cashAppHandle}/${total}`;
  }
  if (method === 'venmo') {
    // Venmo URL with handle, amount, and note pre-filled
    const username = CONFIG.venmoHandle.replace(/^@/, '');
    const note     = encodeURIComponent(code);
    return `https://venmo.com/u/${username}?txn=pay&amount=${total}.00&note=${note}`;
  }
  return null;
}

/* Render the Step 1 pay block on the confirmation screen */
function renderConfirmPayment(method, total, code) {
  const block = $('#confirmPayBlock');
  if (!block) return;

  if (method === 'cashapp') {
    const link = buildPayLink('cashapp', total, code);
    block.innerHTML = `
      <p class="confirm-step-label">Step 1 — Pay now on Cash App</p>
      <a href="${link}" class="btn-pay btn-pay-cashapp" target="_blank" rel="noopener"
         id="payNowBtn" aria-label="Pay $${total} on Cash App">
        <span class="pay-btn-icon" aria-hidden="true">$</span>
        Pay $${total} on Cash App
      </a>
      <p class="confirm-step-note">
        Opens Cash App to <strong>${CONFIG.cashAppHandle}</strong> with $${total} pre-filled.
        In the "For" note, paste your order code: <strong>${code}</strong>
        <button class="inline-copy-btn" id="copyCodeBtn" aria-label="Copy order code ${code}">Copy code</button>
      </p>
    `;
    $('#copyCodeBtn')?.addEventListener('click', () => {
      navigator.clipboard.writeText(code).catch(() => {});
      showToast('Order code copied!');
    });

  } else if (method === 'venmo') {
    const link = buildPayLink('venmo', total, code);
    block.innerHTML = `
      <p class="confirm-step-label">Step 1 — Pay now on Venmo</p>
      <a href="${link}" class="btn-pay btn-pay-venmo" target="_blank" rel="noopener"
         aria-label="Pay $${total} on Venmo">
        <span class="pay-btn-icon" aria-hidden="true">V</span>
        Pay $${total} on Venmo
      </a>
      <p class="confirm-step-note">
        Opens Venmo to <strong>${CONFIG.venmoHandle}</strong> — amount and order code <strong>${code}</strong> are already filled in.
      </p>
    `;

  } else {
    // Apple Cash — payment happens inside the iMessage thread
    block.innerHTML = `
      <p class="confirm-step-label">Step 1 — Pay via Apple Cash in iMessage</p>
      <p class="applepay-note">
        After you text your order (Step 2 below), come back to that Messages thread.
        Tap the <strong>+</strong> icon → <strong>Apple Cash</strong> and send <strong>$${total}</strong>.
        Your order code <strong>${code}</strong> will already be in the thread.
      </p>
    `;
  }
}

/* ══════════════════════════════════════════════
   SHEET LOGGING (fire-and-forget)
   ══════════════════════════════════════════════ */

function logOrderToSheet(code, name, phone, payMethod, total) {
  if (!CONFIG.sheetEndpoint) return;

  const labels   = { cashapp: 'Cash App', venmo: 'Venmo', applepay: 'Apple Cash' };
  const itemsStr = cart.map(item => {
    if (item.type === 'single') return item.name;
    const breakdown = COLORS
      .filter(c => item.colors[c.id] > 0)
      .map(c => `${item.colors[c.id]}x ${c.label}`)
      .join(', ');
    return `${item.name} [${breakdown}]`;
  }).join('; ');

  // GET request avoids the Apps Script POST redirect issue
  const params = new URLSearchParams({
    code,
    name,
    phone,
    items:     itemsStr,
    total,
    payMethod: labels[payMethod] || payMethod,
  });

  fetch(`${CONFIG.sheetEndpoint}?${params}`, { mode: 'no-cors' })
    .catch(() => {}); // never block the order flow on a logging failure
}

/* ══════════════════════════════════════════════
   ORDER CODE GENERATION
   ══════════════════════════════════════════════ */

function generateOrderCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'ADOT-';
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

/* ══════════════════════════════════════════════
   ORDER SUMMARY (plain text for SMS)
   ══════════════════════════════════════════════ */

function buildOrderSummary(code, name, phone, payMethod) {
  const labels = { cashapp: `Cash App (${CONFIG.cashAppHandle})`, venmo: `Venmo (${CONFIG.venmoHandle})`, applepay: `Apple Cash (${CONFIG.phoneDisplay})` };
  const methodLabel = labels[payMethod] || payMethod;

  const lineItems = cart.map(item => {
    if (item.type === 'single') return `  • ${item.name} (single) — $${item.price}`;
    const breakdown = COLORS.filter(c => item.colors[c.id] > 0)
      .map(c => `${item.colors[c.id]}× ${c.label}`).join(', ');
    return `  • ${item.name} [${breakdown}] — $${item.price}`;
  }).join('\n');

  return [
    `THE A-DOT — PRE-ORDER`,
    `─────────────────────`,
    `Order Code: ${code}`,
    `Name:       ${name}`,
    `Phone:      ${phone}`,
    ``,
    `ITEMS:`,
    lineItems,
    ``,
    `TOTAL:      $${cartTotal()}`,
    ``,
    `PAY TO:     ${methodLabel}`,
    `NOTE:       Include order code "${code}" in payment note`,
    `PAY BY:     ${CONFIG.cutoffDay} ${CONFIG.cutoffTime}`,
    ``,
    `PICKUP:     ${CONFIG.pickupDay}, ${CONFIG.pickupWindow}`,
    `ADDRESS:    Texted to you after payment clears.`,
    ``,
    `Questions? Text us: ${CONFIG.phoneDisplay}`,
  ].join('\n');
}

/* ══════════════════════════════════════════════
   VALIDATION
   ══════════════════════════════════════════════ */

function validateCheckout() {
  let valid = true;
  const nameEl   = $('#custName');
  const phoneEl  = $('#custPhone');
  const payEl    = $('input[name="payMethod"]:checked');
  const nameErr  = $('#nameError');
  const phoneErr = $('#phoneError');
  const payErr   = $('#payError');
  const formErr  = $('#formError');

  // Clear
  [nameErr, phoneErr, payErr, formErr].forEach(e => { if (e) e.textContent = ''; });
  nameEl?.classList.remove('invalid');
  phoneEl?.classList.remove('invalid');

  if (cart.length === 0) {
    if (formErr) formErr.textContent = 'Your cart is empty. Add something above.';
    valid = false;
  }

  const name = nameEl?.value.trim() || '';
  if (!name) {
    if (nameErr) nameErr.textContent = 'Please enter your name.';
    nameEl?.classList.add('invalid');
    valid = false;
  }

  const rawPhone = (phoneEl?.value || '').replace(/\D/g, '');
  if (rawPhone.length < 10) {
    if (phoneErr) phoneErr.textContent = 'Enter a valid 10-digit phone number.';
    phoneEl?.classList.add('invalid');
    valid = false;
  }

  if (!payEl) {
    if (payErr) payErr.textContent = 'Pick a payment method.';
    valid = false;
  }

  return valid;
}

/* ══════════════════════════════════════════════
   PLACE ORDER
   ══════════════════════════════════════════════ */

function placeOrder(e) {
  e.preventDefault();
  if (!validateCheckout()) return;

  const name      = $('#custName').value.trim();
  const phone     = $('#custPhone').value.trim();
  const payMethod = $('input[name="payMethod"]:checked').value;
  const code      = generateOrderCode();
  const total     = cartTotal();
  const summary   = buildOrderSummary(code, name, phone, payMethod);

  // Populate confirmation screen
  $('#orderCode').textContent = code;
  $('#orderSummaryText').textContent = summary;

  // SMS link
  const smsBody = encodeURIComponent(summary);
  const smsLink = `sms:${CONFIG.phone}${/iPhone|iPad|iPod/.test(navigator.userAgent) ? '&' : '?'}body=${smsBody}`;
  const smsBtn  = $('#smsBtn');
  if (smsBtn) smsBtn.href = smsLink;

  // Copy summary button
  const copyBtn = $('#copyBtn');
  if (copyBtn) {
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(summary).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = summary;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      });
      showToast('Copied!');
    };
  }

  // Build pay block based on method
  renderConfirmPayment(payMethod, total, code);

  // Log to Google Sheet (non-blocking)
  logOrderToSheet(code, name, phone, payMethod, total);

  showView('confirm');
}

/* ══════════════════════════════════════════════
   RESET
   ══════════════════════════════════════════════ */

function resetAll() {
  cart = [];
  packDraft = {};
  // Clear form
  const form = $('#checkoutForm');
  if (form) form.reset();
  // Clear payment selection and preview
  $$('input[name="payMethod"]').forEach(r => r.checked = false);
  hide($('#payPreview'));
  // Clear errors
  $$('.field-error').forEach(e => e.textContent = '');
  $$('.invalid').forEach(e => e.classList.remove('invalid'));

  // Re-render menu and cart
  renderSingles();
  renderPacks();
  renderCart();

  showView('home');
}

/* ══════════════════════════════════════════════
   FAQ
   ══════════════════════════════════════════════ */

function renderFAQ() {
  const list = $('#faqList');
  if (!list) return;
  list.innerHTML = FAQ_ITEMS.map((item, i) => {
    const id = `faq-a-${i}`;
    return `
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false" aria-controls="${id}" id="faq-q-${i}">
          ${item.q}
          <span class="faq-chevron" aria-hidden="true">▼</span>
        </button>
        <div class="faq-a" id="${id}" role="region" aria-labelledby="faq-q-${i}">
          ${item.a}
        </div>
      </div>
    `;
  }).join('');

  // Accordion behavior
  list.addEventListener('click', e => {
    const btn = e.target.closest('.faq-q');
    if (!btn) return;
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    const ans = $('#' + btn.getAttribute('aria-controls'));
    if (ans) ans.classList.toggle('open', !expanded);
  });
}

/* ══════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════ */

function renderFooter() {
  const terms = $('#termsBody');
  if (terms) terms.innerHTML = TERMS_HTML;
  const year = $('#footerYear');
  if (year) year.textContent = new Date().getFullYear();
}

/* ══════════════════════════════════════════════
   TOAST
   ══════════════════════════════════════════════ */

let toastTimer;
function showToast(msg) {
  let t = $('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    t.setAttribute('role', 'status');
    t.setAttribute('aria-live', 'polite');
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ══════════════════════════════════════════════
   EVENT DELEGATION
   ══════════════════════════════════════════════ */

function attachEvents() {
  // Nav buttons
  $$('[data-view]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      showView(btn.dataset.view);
    });
  });

  // Cart button (open drawer)
  $('#cartBtn')?.addEventListener('click', openDrawer);
  $('#drawerClose')?.addEventListener('click', closeDrawer);
  $('#cartOverlay')?.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

  // Menu — add single (delegated)
  document.addEventListener('click', e => {
    const btn = e.target.closest('.add-single-btn');
    if (btn) addSingle(btn.dataset.singleId);
  });

  // Menu — pack steppers (delegated)
  document.addEventListener('click', e => {
    const btn = e.target.closest('.stepper-btn');
    if (!btn) return;
    const { pack: packId, color, action } = btn.dataset;
    const pk = PACKS.find(p => p.id === packId);
    if (!pk) return;
    const draft = getPackDraft(packId);
    const total = sumDraft(draft);
    if (action === 'inc' && total < pk.cups) draft[color]++;
    if (action === 'dec' && draft[color] > 0) draft[color]--;
    renderPacks();
  });

  // Menu — add pack (delegated)
  document.addEventListener('click', e => {
    const btn = e.target.closest('.add-pack-btn');
    if (btn && !btn.disabled) addPack(btn.dataset.packId);
  });

  // Cart — remove item (delegated, all contexts)
  document.addEventListener('click', e => {
    const btn = e.target.closest('.cart-item-remove');
    if (btn) removeCartItem(btn.dataset.removeId);
  });

  // Checkout button (inline cart)
  $('#checkoutBtn')?.addEventListener('click', goToCheckout);

  // Back to cart
  $('#backToCartBtn')?.addEventListener('click', goBackToCart);

  // Payment method change
  document.addEventListener('change', e => {
    if (e.target.name === 'payMethod') renderPaymentPreview();
  });

  // Submit order
  $('#checkoutForm')?.addEventListener('submit', placeOrder);

  // New order
  $('#newOrderBtn')?.addEventListener('click', resetAll);
}

/* ══════════════════════════════════════════════
   INIT
   ══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // Inject hero cup (Five Points — all four line colors)
  const heroCup = $('#heroCup');
  if (heroCup) {
    heroCup.innerHTML = dotCakeSVG(
      ['red','blue','gold','green'],
      LINE_ACCENT['five-points'],
      'hero'
    );
  }

  renderSingles();
  renderPacks();
  renderCart();
  renderFAQ();
  renderFooter();
  attachEvents();

  showView('home');

  const yr = $('#footerYear');
  if (yr) yr.textContent = new Date().getFullYear();
});
