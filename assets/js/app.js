/* SensiHome PAW náhled: hlavička, patička, produkty, košík (jen v prohlížeči). */
(function () {
  "use strict";

  const SOCIAL = {
    ig: "https://www.instagram.com/hendikepovany_pes/",
    fb: "https://www.facebook.com/HendikepovanyPes/",
    tt: "https://www.tiktok.com/@hendikepovany_pes"
  };
  const SHIPPING = [
    { id: "zasilkovna", label: "Zásilkovna, výdejní místo" },
    { id: "balik", label: "Balík do ruky" }
  ];
  const PAYMENT = [
    { id: "karta", label: "Kartou online" },
    { id: "prevod", label: "Bankovním převodem" },
    { id: "dobirka", label: "Na dobírku" }
  ];
  const CART_KEY = "shp_cart_v2";

  /* ikony (stejná sada jako v designu) */
  const ICON = {
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
    heart2: '<svg viewBox="0 0 24 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-8-5.2-9.6-10A5.3 5.3 0 0 1 12 5.6 5.3 5.3 0 0 1 21.6 10C20 14.8 12 20 12 20z"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
    tt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>',
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    paw: '<svg viewBox="0 0 24 24"><ellipse cx="7.5" cy="8" rx="2" ry="2.8"/><ellipse cx="12" cy="6" rx="2" ry="2.8"/><ellipse cx="16.5" cy="8" rx="2" ry="2.8"/><ellipse cx="4.5" cy="12.5" rx="1.7" ry="2.3"/><ellipse cx="19.5" cy="12.5" rx="1.7" ry="2.3"/><path d="M12 11.5c3.6 0 6.3 2.9 6.3 5.6 0 1.8-1.3 3-3 3-1.3 0-2.1-.7-3.3-.7s-2 .7-3.3.7c-1.7 0-3-1.2-3-3 0-2.7 2.7-5.6 6.3-5.6z"/></svg>',
    shirt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H7L3 7l2 2 2-1v12h10V8l2 1 2-2-4-4h-2a3 3 0 0 1-6 0z"/></svg>',
    key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="6" r="3"/><path d="M12 9v3"/><rect x="8" y="12" width="8" height="9" rx="2"/></svg>',
    gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/></svg>'
  };
  const CAT_FILL = { "Pro pejska": true };
  const CAT_ICON = { "Oblečení": ICON.shirt, "Doplňky": ICON.key, "Pro pejska": ICON.paw };
  window.SHP_ICON = ICON;

  const PRODUCTS = window.SHP_PRODUCTS || [];
  const page = (location.pathname.split("/").pop() || "index.html");

  /* ---------- hlavička a patička ---------- */
  function header() {
    const nav = [
      ["eshop.html", "E-shop"], ["o-projektu.html", "O projektu"], ["nas-pribeh.html", "Náš příběh"],
      ["podporte-nas.html", "Podpořte nás"], ["kontakt.html", "Kontakt"]
    ];
    const act = (f) => (page === f || (f === "eshop.html" && page === "produkt.html")) ? ' class="active"' : "";
    return `
    <div class="previewbar">Náhled webu: produkty, ceny a platba zatím nejsou ostré.</div>
    <div class="topbar"><div class="wrap">
      <div class="claim">${ICON.heart}<span>Bezpečný domov pro psy se smyslovým hendikepem</span></div>
      <nav>
        <span class="pages"><a href="faq.html">Časté dotazy</a><a href="kontakt.html">Kontakt</a></span>
        <span class="sep"></span>
        <span class="social"><a href="${SOCIAL.fb}" target="_blank" rel="noopener" aria-label="Facebook">${ICON.fb}</a><a href="${SOCIAL.ig}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.ig}</a><a href="${SOCIAL.tt}" target="_blank" rel="noopener" aria-label="TikTok">${ICON.tt}</a></span>
      </nav>
    </div></div>
    <header class="header"><div class="wrap">
      <a class="brand" href="index.html" aria-label="SensiHome PAW, úvod"><img src="assets/img/logo.png" alt="SensiHome PAW"></a>
      <nav class="mainnav" id="mainnav" aria-label="Hlavní navigace">${nav.map(([f, t]) => `<a href="${f}"${act(f)}>${t}</a>`).join("")}</nav>
      <div class="tools">
        <a class="iconbtn" href="eshop.html" aria-label="Hledat">${ICON.search}</a>
        <a class="iconbtn" href="kosik.html" aria-label="Košík">${ICON.cart}<span class="badge hidden" id="cartbadge">0</span></a>
        <button class="iconbtn burger" id="burger" aria-label="Menu">${ICON.menu}</button>
      </div>
    </div></header>`;
  }

  function footer() {
    return `
    <footer class="footer">
      <div class="wrap top">
        <div class="brandcol">
          <img src="assets/img/logo-white.png" alt="SensiHome PAW">
          <div class="claim">Domov, který rozumí jejich světu.</div>
          <p class="sub">Bezpečný a srozumitelný domov pro psy se smyslovým hendikepem.</p>
        </div>
        <div>
          <h4>SensiHome PAW</h4>
          <ul>
            <li><a href="eshop.html">E-shop</a></li><li><a href="o-projektu.html">O projektu</a></li>
            <li><a href="nas-pribeh.html">Náš příběh</a></li><li><a href="podporte-nas.html">Podpořte nás</a></li>
            <li><a href="kontakt.html">Kontakt</a></li>
          </ul>
        </div>
        <div>
          <h4>Informace</h4>
          <ul>
            <li><a href="faq.html">Časté dotazy</a></li>
            <li><a href="#" data-todo="Obchodní podmínky">Obchodní podmínky</a></li>
            <li><a href="#" data-todo="Ochrana osobních údajů">Ochrana osobních údajů</a></li>
            <li><a href="#" data-todo="Reklamační podmínky">Reklamační podmínky</a></li>
          </ul>
          <h4 style="margin-top:22px">Sledujte nás</h4>
          <div class="socials"><a href="${SOCIAL.fb}" target="_blank" rel="noopener" aria-label="Facebook">${ICON.fb}</a><a href="${SOCIAL.ig}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.ig}</a><a href="${SOCIAL.tt}" target="_blank" rel="noopener" aria-label="TikTok">${ICON.tt}</a></div>
        </div>
      </div>
      <div class="bottom"><div class="wrap"><span><strong>© SensiHome PAW</strong></span><span>Náhled webu, verze pro připomínky</span></div></div>
    </footer>
    <div class="toast" id="toast" role="status"></div>
    <div class="modal" id="modal"><div class="box" id="modalbox"></div></div>`;
  }

  /* ---------- pomocné ---------- */
  const money = (n) => new Intl.NumberFormat("cs-CZ", { style: "currency", currency: "CZK", maximumFractionDigits: 0 }).format(n);
  const priceHtml = (p) => p.cena == null ? '<span class="price tbd">Cena bude upřesněna</span>' : `<span class="price">${money(p.cena)}</span>`;
  const photoTbd = (label) => `<div class="photo-tbd">${ICON.paw}<span>${label || "Foto produktu připravujeme"}</span></div>`;

  function toast(msg) {
    const t = document.getElementById("toast"); if (!t) return;
    t.textContent = msg; t.classList.add("show");
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 2600);
  }
  function modal(html) {
    const m = document.getElementById("modal"); document.getElementById("modalbox").innerHTML = html; m.classList.add("open");
    m.onclick = (e) => { if (e.target === m || e.target.closest("[data-close]")) m.classList.remove("open"); };
  }

  /* jednopísmenné předložky a spojky nenechávat na konci řádku */
  function fixNbsp(root) {
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (/^(SCRIPT|STYLE|TEXTAREA|INPUT)$/.test(n.parentNode.nodeName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT)
    });
    const re = /(^|[\s(„])([kKsSvVzZoOuUaAiI])\s+/g;
    let n; while ((n = w.nextNode())) { if (re.test(n.nodeValue)) { re.lastIndex = 0; n.nodeValue = n.nodeValue.replace(re, "$1$2 "); } }
  }

  /* ---------- košík ---------- */
  const getCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; } };
  const setCart = (c) => { try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch (e) {} badge(); };
  function badge() {
    const b = document.getElementById("cartbadge"); if (!b) return;
    const n = getCart().reduce((s, i) => s + i.qty, 0); b.textContent = n; b.classList.toggle("hidden", n === 0);
  }
  function addToCart(p, size, color, qty) {
    const c = getCart(); const key = [p.id, size, color].join("|");
    const ex = c.find((i) => i.key === key);
    if (ex) ex.qty += qty; else c.push({ key, id: p.id, nazev: p.nazev, cena: p.cena, size, color, qty });
    setCart(c);
    toast(`Přidáno do košíku: ${p.nazev}${size ? ", " + size : ""}${color ? ", " + color : ""}`);
  }

  /* ---------- produkty ---------- */
  function card(p) {
    return `<article class="card">
      <a class="img" href="produkt.html?id=${p.id}">${photoTbd()}</a>
      <button class="fav" type="button" aria-label="Přidat do oblíbených" data-fav>${ICON.heart}</button>
      <div class="body">
        <h3><a href="produkt.html?id=${p.id}">${p.nazev}</a></h3>
        <p class="short">${p.kratky}</p>
        <div class="foot">${priceHtml(p)}<a class="btn small" href="produkt.html?id=${p.id}">Vybrat</a></div>
      </div></article>`;
  }
  function bindFav(root) {
    root.querySelectorAll("[data-fav]").forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); b.classList.toggle("on"); }));
  }
  function renderGrid(el, list) {
    el.innerHTML = list.length ? list.map(card).join("") : '<div class="empty-cat">V&nbsp;této kategorii zatím nic není. Připravujeme pelechy, vodítka a&nbsp;další věci pro pejsky.</div>';
    bindFav(el); fixNbsp(el);
  }
  function renderCats(el, grid, opts) {
    const cats = window.SHP_CATEGORIES || [];
    el.innerHTML = cats.map((c) => `<button class="catlink" type="button" data-cat="${c}"><span class="caticon"${CAT_FILL[c] ? ' style="fill:currentColor"' : ""}>${CAT_ICON[c] || ICON.paw}</span>${c}</button>`).join("");
    el.querySelectorAll(".catlink").forEach((b) => b.addEventListener("click", () => {
      if (opts && opts.navigate) { location.href = "eshop.html?kategorie=" + encodeURIComponent(b.dataset.cat); return; }
      const on = b.classList.contains("active");
      el.querySelectorAll(".catlink").forEach((x) => x.classList.remove("active"));
      if (!on) b.classList.add("active");
      renderGrid(grid, on ? PRODUCTS : PRODUCTS.filter((p) => p.kategorie === b.dataset.cat));
    }));
    if (opts && opts.preselect) {
      const b = [...el.querySelectorAll(".catlink")].find((x) => x.dataset.cat === opts.preselect);
      if (b) b.click();
    }
  }

  function renderProduct(root) {
    const id = new URLSearchParams(location.search).get("id");
    const p = PRODUCTS.find((x) => x.id === id) || PRODUCTS[0];
    document.title = p.nazev + " | SensiHome PAW";
    let size = p.velikosti[0] || "", color = p.barvy[0] || "", qty = 1;
    const chips = (arr, id) => `<div class="chips" id="${id}">${arr.map((v, i) => `<button type="button" class="chip${i === 0 ? " on" : ""}" data-v="${v}">${v}</button>`).join("")}</div>`;
    root.innerHTML = `
      <div class="crumbs"><a href="eshop.html">E-shop</a> / <a href="eshop.html?kategorie=${encodeURIComponent(p.kategorie)}">${p.kategorie}</a> / ${p.nazev}</div>
      <div class="layout">
        <div class="gallery">${photoTbd("Produktové foto doplníme")}</div>
        <div>
          <h1>${p.nazev}</h1>
          <p class="short">${p.kratky}</p>
          <div class="price-row">${priceHtml(p)}</div>
          ${p.velikosti.length > 1 ? `<div class="opt"><label>Velikost</label>${chips(p.velikosti, "sizes")}</div>` : ""}
          ${p.barvy.length > 1 ? `<div class="opt"><label>Barva</label>${chips(p.barvy, "colors")}</div>` : ""}
          <div class="buy">
            <div class="qty"><button type="button" id="minus" aria-label="Méně">−</button><input id="qty" value="1" inputmode="numeric" aria-label="Množství"><button type="button" id="plus" aria-label="Více">+</button></div>
            <button class="btn" type="button" id="add">${ICON.cart} Do košíku</button>
          </div>
          <div class="desc">
            <h3>O produktu</h3>
            <p>${p.dlouhy}</p>
            <h3>Praktické informace</h3>
            <div class="todo">Materiál, rozměry, údržba a dostupné varianty doplníme podle finální podoby výrobku.${p.velikosti.length > 1 ? " Tabulku velikostí doplníme od výrobce." : ""}</div>
          </div>
        </div>
      </div>`;
    const pick = (id, cb) => { const el = document.getElementById(id); if (!el) return; el.addEventListener("click", (e) => { const b = e.target.closest(".chip"); if (!b) return; el.querySelectorAll(".chip").forEach((x) => x.classList.remove("on")); b.classList.add("on"); cb(b.dataset.v); }); };
    pick("sizes", (v) => (size = v)); pick("colors", (v) => (color = v));
    const q = document.getElementById("qty");
    document.getElementById("minus").onclick = () => { qty = Math.max(1, qty - 1); q.value = qty; };
    document.getElementById("plus").onclick = () => { qty = Math.min(20, qty + 1); q.value = qty; };
    q.onchange = () => { qty = Math.min(20, Math.max(1, parseInt(q.value, 10) || 1)); q.value = qty; };
    document.getElementById("add").onclick = () => addToCart(p, size, color, qty);
  }

  function renderCart(root) {
    let ship = SHIPPING[0].id, pay = PAYMENT[0].id;
    function draw() {
      const c = getCart();
      if (!c.length) {
        root.innerHTML = `<div class="empty"><p>Váš košík zatím čeká na první radost. Vyberte si něco z&nbsp;naší kolekce.</p><a class="btn" href="eshop.html">Zpět do e-shopu</a></div>`;
        fixNbsp(root); return;
      }
      const known = c.every((i) => i.cena != null);
      const sub = c.reduce((s, i) => s + (i.cena || 0) * i.qty, 0);
      root.innerHTML = `
        <div class="layout">
          <div>
            <p style="color:var(--text);margin-bottom:18px">Ještě než objednávku dokončíte, zkontrolujte prosím vybrané produkty, varianty a&nbsp;množství.</p>
            <div class="cart-items">${c.map((i) => `
              <div class="cart-row">
                <div class="thumb">${ICON.paw}</div>
                <div><div class="name">${i.nazev}</div><div class="vars">${[i.size, i.color].filter(Boolean).join(", ") || "&nbsp;"}</div><button class="remove" type="button" data-rm="${i.key}">Odebrat</button></div>
                <div class="right">${i.cena == null ? '<span class="price tbd">cena bude upřesněna</span>' : `<span class="price">${money(i.cena * i.qty)}</span>`}
                  <div class="qty"><button type="button" data-dec="${i.key}">−</button><input value="${i.qty}" readonly aria-label="Množství"><button type="button" data-inc="${i.key}">+</button></div></div>
              </div>`).join("")}</div>
          </div>
          <aside class="summary">
            <h3>Souhrn objednávky</h3>
            <fieldset><legend>Doprava</legend>${SHIPPING.map((s) => `<label class="radio"><input type="radio" name="ship" value="${s.id}" ${s.id === ship ? "checked" : ""}> ${s.label}<span class="p">cena se doplní</span></label>`).join("")}</fieldset>
            <fieldset><legend>Platba</legend>${PAYMENT.map((s) => `<label class="radio"><input type="radio" name="pay" value="${s.id}" ${s.id === pay ? "checked" : ""}> ${s.label}</label>`).join("")}</fieldset>
            <div class="sum-row"><span>Zboží</span><span>${known ? money(sub) : "doplní se"}</span></div>
            <div class="sum-row"><span>Doprava</span><span>doplní se</span></div>
            <div class="sum-row total"><span>Celkem</span><span>${known ? money(sub) + " + doprava" : "doplní se"}</span></div>
            <form class="form" id="checkout">
              <input placeholder="Jméno" required autocomplete="given-name"><input placeholder="Příjmení" required autocomplete="family-name">
              <input class="full" type="email" placeholder="E-mail" required autocomplete="email">
              <input class="full" placeholder="Telefon" required autocomplete="tel">
              <input class="full" placeholder="Ulice a číslo popisné" required autocomplete="street-address">
              <input placeholder="Město" required autocomplete="address-level2"><input placeholder="PSČ" required autocomplete="postal-code">
              <label class="check"><input type="checkbox" required> Souhlasím s&nbsp;obchodními podmínkami a&nbsp;zpracováním osobních údajů.</label>
              <button class="btn block full" type="submit">Pokračovat k&nbsp;objednávce</button>
            </form>
            <p class="note">Náhled: objednávka se nikam neodešle a&nbsp;nic se neplatí.</p>
          </aside>
        </div>`;
      const upd = (key, d) => { let c2 = getCart(); const it = c2.find((x) => x.key === key); it.qty += d; if (it.qty <= 0) c2 = c2.filter((x) => x !== it); setCart(c2); draw(); };
      root.querySelectorAll("[data-rm]").forEach((b) => (b.onclick = () => { setCart(getCart().filter((i) => i.key !== b.dataset.rm)); draw(); }));
      root.querySelectorAll("[data-inc]").forEach((b) => (b.onclick = () => upd(b.dataset.inc, 1)));
      root.querySelectorAll("[data-dec]").forEach((b) => (b.onclick = () => upd(b.dataset.dec, -1)));
      root.querySelectorAll("input[name=ship]").forEach((r) => (r.onchange = () => { ship = r.value; }));
      root.querySelectorAll("input[name=pay]").forEach((r) => (r.onchange = () => { pay = r.value; }));
      document.getElementById("checkout").onsubmit = (e) => {
        e.preventDefault();
        modal(`<div class="hand">Děkujeme za vaši objednávku!</div><p>Potvrzení a&nbsp;další informace vám zašleme e-mailem.</p><p>Děkujeme, že jste si vybrali SensiHome PAW. Vážíme si každého člověka, který pomáhá šířit naši myšlenku.</p><p class="note">Toto je náhled, objednávka se neodeslala.</p><button class="btn" data-close>Zavřít</button>`);
        fixNbsp(document.getElementById("modalbox"));
        setCart([]); draw();
      };
      fixNbsp(root);
    }
    draw();
  }

  /* ---------- init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    const h = document.getElementById("site-header"), f = document.getElementById("site-footer");
    if (h) h.outerHTML = header();
    if (f) f.outerHTML = footer();
    badge();
    const burger = document.getElementById("burger");
    if (burger) burger.onclick = () => document.getElementById("mainnav").classList.toggle("open");
    document.querySelectorAll("[data-todo]").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); toast(a.dataset.todo + ": text doplníme před spuštěním."); }));
    document.querySelectorAll("[data-icon]").forEach((el) => { el.innerHTML = ICON[el.dataset.icon] || ""; });

    const grid = document.getElementById("grid");
    const cats = document.getElementById("cats");
    if (grid) {
      const limit = parseInt(grid.dataset.limit || "0", 10);
      renderGrid(grid, limit ? PRODUCTS.slice(0, limit) : PRODUCTS);
      if (cats) renderCats(cats, grid, { navigate: grid.dataset.limit !== undefined, preselect: new URLSearchParams(location.search).get("kategorie") });
    }
    const prod = document.getElementById("product"); if (prod) renderProduct(prod);
    const cart = document.getElementById("cart"); if (cart) renderCart(cart);
    fixNbsp(document.body);
  });
})();
