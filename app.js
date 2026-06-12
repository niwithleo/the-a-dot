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
  const btn = $(`[data-view="${name}"]`);
  if (btn) btn.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ══════════════════════════════════════════════
   RENDER — MENU
   ══════════════════════════════════════════════ */

function renderDotSwatch(dots) {
  return `<div class="dot-swatch" aria-hidden="true">${
    dots.map(d => `<span class="dot dot-${d}"></span>`).join('')
  }</div>`;
}

function renderSingles() {
  const grid = $('#singlesGrid');
  if (!grid) return;
  grid.innerHTML = SINGLES.map(p => `
    <div class="product-card" data-color="${p.color}">
      <div class="product-card-header">
        <span class="product-card-name">${p.name}</span>
        <span class="product-card-price">$${CONFIG.singlePrice}</span>
      </div>
      <p class="product-card-desc">${p.desc}</p>
      ${renderDotSwatch(p.dots)}
      <button
        class="btn btn-primary add-single-btn"
        data-single-id="${p.id}"
        aria-label="Add ${p.name} to cart, $${CONFIG.singlePrice}">
        Add to Cart
      </button>
    </div>
  `).join('');
}

function renderPacks() {
  const grid = $('#packsGrid');
  if (!grid) return;
  grid.innerHTML = PACKS.map(pk => {
    const draft = getPackDraft(pk.id);
    const total = sumDraft(draft);
    const pct = Math.min(100, (total / pk.cups) * 100);
    const exact = total === pk.cups;
    const over  = total > pk.cups;
    return `
      <div class="product-card" data-color="pack" data-pack-id="${pk.id}">
        <div class="product-card-header">
          <span class="product-card-name">${pk.name}</span>
          <span class="product-card-price">$${pk.price}</span>
        </div>
        <p class="product-card-desc">${pk.desc} Save $${pk.savings}.</p>

        <div class="pack-builder" aria-label="${pk.name} color builder">
          ${COLORS.map(c => `
            <div class="pack-color-row">
              <span class="pack-color-label">
                <span class="dot ${c.dotClass}" aria-hidden="true"></span>
                ${c.label}
              </span>
              <div class="stepper" role="group" aria-label="${c.label} quantity">
                <button
                  class="stepper-btn"
                  data-pack="${pk.id}" data-color="${c.id}" data-action="dec"
                  aria-label="Remove one ${c.label}"
                  ${draft[c.id] === 0 ? 'disabled' : ''}>−</button>
                <span class="stepper-val" aria-live="polite" aria-label="${c.label} count">${draft[c.id]}</span>
                <button
                  class="stepper-btn"
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
            ${exact
              ? `Pack full! (${total}/${pk.cups})`
              : over
                ? `Too many — remove ${total - pk.cups}`
                : `${total}/${pk.cups} cups selected`}
          </p>
        </div>

        <button
          class="btn btn-primary add-pack-btn"
          data-pack-id="${pk.id}"
          aria-label="Add ${pk.name} to cart"
          ${!exact ? 'disabled' : ''}>
          ${exact ? `Add Pack — $${pk.price}` : `Fill all ${pk.cups} cups first`}
        </button>
      </div>
    `;
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
  // Also update live total inside payment instructions
  renderPaymentInstructions();
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
  hide($('#cartSection'));
  show($('#checkoutSection'));
  $('#custName')?.focus();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBackToCart() {
  hide($('#checkoutSection'));
  show($('#cartSection'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* Payment instructions per method */
const PAYMENT_INSTRUCTIONS = {
  cashapp: (total) => [
    `Place your order below and text it to us at <strong>${CONFIG.phoneDisplay}</strong>.`,
    `Right away, send <strong>$${total}</strong> to <span class="pay-handle">${CONFIG.cashAppHandle}</span> on Cash App. Put your <strong>order code in the payment note</strong>.`,
    `Within 30–60 minutes you'll get a text with the <strong>pickup address and your pickup time</strong> (${CONFIG.pickupDay}, ${CONFIG.pickupWindow}).`,
    `Payment must clear by <strong>${CONFIG.cutoffDay} ${CONFIG.cutoffTime}</strong> — unpaid orders don't get baked.`,
  ],
  venmo: (total) => [
    `Place your order below and text it to us at <strong>${CONFIG.phoneDisplay}</strong>.`,
    `Right away, send <strong>$${total}</strong> to <span class="pay-handle">${CONFIG.venmoHandle}</span> on Venmo. Put your <strong>order code in the payment note</strong>.`,
    `Within 30–60 minutes you'll get a text with the <strong>pickup address and your pickup time</strong> (${CONFIG.pickupDay}, ${CONFIG.pickupWindow}).`,
    `Payment must clear by <strong>${CONFIG.cutoffDay} ${CONFIG.cutoffTime}</strong> — unpaid orders don't get baked.`,
  ],
  applepay: (total) => [
    `Place your order below and text it to us at <strong>${CONFIG.phoneDisplay}</strong>.`,
    `Right away, inside that same Messages thread, tap the <strong>+</strong> icon → Apple Cash and send <strong>$${total}</strong>. Your order code will already be in the thread.`,
    `Within 30–60 minutes you'll get a text with the <strong>pickup address and your pickup time</strong> (${CONFIG.pickupDay}, ${CONFIG.pickupWindow}).`,
    `Payment must clear by <strong>${CONFIG.cutoffDay} ${CONFIG.cutoffTime}</strong> — unpaid orders don't get baked.`,
  ],
};

function renderPaymentInstructions() {
  const panel   = $('#payInstructions');
  const title   = $('#payInstructionsTitle');
  const list    = $('#payInstructionsList');
  const checked = $('input[name="payMethod"]:checked');
  if (!panel || !list) return;

  if (!checked) { hide(panel); return; }

  const method = checked.value;
  const total  = cartTotal();
  const steps  = PAYMENT_INSTRUCTIONS[method]?.(total);
  if (!steps)  { hide(panel); return; }

  const labels = { cashapp: 'Cash App', venmo: 'Venmo', applepay: 'Apple Cash' };
  title.textContent = `How to Pay with ${labels[method]}`;
  list.innerHTML = steps.map(s => `<li>${s}</li>`).join('');
  show(panel);
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
  const summary   = buildOrderSummary(code, name, phone, payMethod);

  // Store for confirmation screen
  $('#orderCode').textContent = code;
  $('#orderSummaryText').textContent = summary;

  // SMS link
  const smsBody  = encodeURIComponent(summary);
  const smsLink  = `sms:${CONFIG.phone}${/iPhone|iPad|iPod/.test(navigator.userAgent) ? '&' : '?'}body=${smsBody}`;
  const smsBtn   = $('#smsBtn');
  if (smsBtn) smsBtn.href = smsLink;

  // Copy button
  const copyBtn = $('#copyBtn');
  if (copyBtn) {
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(summary).then(() => showToast('Copied!')).catch(() => {
        // Fallback for older browsers
        const ta = document.createElement('textarea');
        ta.value = summary;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('Copied!');
      });
    };
  }

  hide($('#checkoutSection'));
  show($('#confirmSection'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
  // Clear payment selection
  $$('input[name="payMethod"]').forEach(r => r.checked = false);
  hide($('#payInstructions'));
  // Clear errors
  $$('.field-error').forEach(e => e.textContent = '');
  $$('.invalid').forEach(e => e.classList.remove('invalid'));

  // Re-render
  renderSingles();
  renderPacks();
  renderCart();

  hide($('#confirmSection'));
  hide($('#checkoutSection'));
  show($('#cartSection'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
    if (e.target.name === 'payMethod') {
      renderPaymentInstructions();
      // Visual selected state
      $$('.pay-card').forEach(card => card.classList.remove('selected'));
    }
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
  renderSingles();
  renderPacks();
  renderCart();
  renderFAQ();
  renderFooter();
  attachEvents();

  // Set initial view
  showView('home');

  // Footer year
  const yr = $('#footerYear');
  if (yr) yr.textContent = new Date().getFullYear();
});
