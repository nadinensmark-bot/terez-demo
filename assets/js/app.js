/* SensiHome PAW demo: sdílená hlavička/patička, produkty, košík.
   Produkty se načítají z data/products.json. Když je v config.js nastavené
   SHEET_CSV_URL (publikovaná Google tabulka jako CSV), má přednost. */

(function () {
  "use strict";

  const CFG = window.SHP_CONFIG || {};
  const CART_KEY = "shp_cart_v1";
  const FAV_KEY = "shp_fav_v1";
  const SHIPPING = CFG.shipping || [
    { id: "zasilkovna", label: "Zásilkovna, výdejní místo", price: 79 },
    { id: "posta", label: "Balík do ruky", price: 129 },
    { id: "osobne", label: "Osobní odběr", price: 0 }
  ];

  /* ---------- ikony ---------- */
  const I = {
    paw: '<svg viewBox="0 0 24 24"><path d="M12 21c-3 0-5.5-1.8-5.5-4.3 0-1.7 1.2-2.6 2.2-3.7.9-1 1.5-2.4 3.3-2.4s2.4 1.4 3.3 2.4c1 1.1 2.2 2 2.2 3.7C17.5 19.2 15 21 12 21zM6.2 12.4c-1.1.3-2.3-.5-2.7-1.8-.4-1.3.2-2.6 1.3-2.9 1.1-.3 2.3.5 2.7 1.8.4 1.3-.2 2.6-1.3 2.9zm11.6 0c-1.1-.3-1.7-1.6-1.3-2.9.4-1.3 1.6-2.1 2.7-1.8 1.1.3 1.7 1.6 1.3 2.9-.4 1.3-1.6 2.1-2.7 1.8zM9.3 8.6c-1.2.1-2.2-1-2.3-2.4C6.9 4.8 7.8 3.6 9 3.5c1.2-.1 2.2 1 2.3 2.4.1 1.4-.8 2.6-2 2.7zm5.4 0c-1.2-.1-2.1-1.3-2-2.7.1-1.4 1.1-2.5 2.3-2.4 1.2.1 2.1 1.3 2 2.7-.1 1.4-1.1 2.5-2.3 2.4z"/></svg>',
    heart: '<svg viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 8a4.3 4.3 0 0 1 7.5 2.5c0 5.4-7.5 10-7.5 10z"/></svg>',
    search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"/></svg>',
    cart: '<svg viewBox="0 0 24 24"><path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L20 8H6.5"/><circle cx="9.5" cy="20" r="1.3"/><circle cx="17" cy="20" r="1.3"/></svg>',
    menu: '<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    fb: '<svg viewBox="0 0 24 24"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.4H7.4V14h2.8v8h3.3z"/></svg>',
    ig: '<svg viewBox="0 0 24 24"><path d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2zm6.1-8.1a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM21 7.1c-.1-1.5-.4-2.8-1.5-3.9S17.1 1.8 15.6 1.7C14.1 1.6 9.9 1.6 8.4 1.7 6.9 1.8 5.6 2.1 4.5 3.2S3.1 5.6 3 7.1c-.1 1.5-.1 5.7 0 7.2.1 1.5.4 2.8 1.5 3.9s2.4 1.4 3.9 1.5c1.5.1 5.7.1 7.2 0 1.5-.1 2.8-.4 3.9-1.5s1.4-2.4 1.5-3.9c.1-1.5.1-5.7 0-7.2zm-2 8.8c-.3.8-.9 1.4-1.7 1.7-1.2.5-4 .4-5.3.4s-4.1.1-5.3-.4c-.8-.3-1.4-.9-1.7-1.7-.5-1.2-.4-4-.4-5.3s-.1-4.1.4-5.3c.3-.8.9-1.4 1.7-1.7 1.2-.5 4-.4 5.3-.4s4.1-.1 5.3.4c.8.3 1.4.9 1.7 1.7.5 1.2.4 4 .4 5.3s.1 4.1-.4 5.3z"/></svg>',
    tt: '<svg viewBox="0 0 24 24"><path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.8 5.8 0 1 0 5 5.7V9.1a7.4 7.4 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.3-1.6z"/></svg>',
    truck: '<svg viewBox="0 0 24 24"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/></svg>',
    leaf: '<svg viewBox="0 0 24 24"><path d="M5 19C7 9 13 5 20 4c-1 7-5 13-15 15zM5 19c3-4 6-7 10-9"/></svg>',
    heartO: '<svg viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 8a4.3 4.3 0 0 1 7.5 2.5c0 5.4-7.5 10-7.5 10z"/></svg>',
    pawO: '<svg viewBox="0 0 24 24"><path d="M12 20c-2.8 0-5-1.6-5-3.8 0-1.5 1.1-2.3 2-3.3.8-.9 1.4-2.1 3-2.1s2.2 1.2 3 2.1c.9 1 2 1.8 2 3.3 0 2.2-2.2 3.8-5 3.8z"/><ellipse cx="6" cy="10" rx="1.6" ry="2.2"/><ellipse cx="18" cy="10" rx="1.6" ry="2.2"/><ellipse cx="9.3" cy="6.3" rx="1.6" ry="2.2"/><ellipse cx="14.7" cy="6.3" rx="1.6" ry="2.2"/></svg>'
  };

  /* kategorie: ikony v liště */
  const CAT_ICONS = {
    "Mikiny": '<svg viewBox="0 0 24 24"><path d="M12 3c-1.8 0-3 1.2-3 2.5V7l-3 1.5V20h12V8.5L15 7V5.5C15 4.2 13.8 3 12 3z"/><path d="M9 7c0 2 1.3 3 3 3s3-1 3-3"/></svg>',
    "Trička": '<svg viewBox="0 0 24 24"><path d="M8 3h8l1 3 4 2-2 3-2-1v11H7V10l-2 1-2-3 4-2z"/><path d="M8 3c0 2 1.8 3.5 4 3.5S16 5 16 3"/></svg>',
    "Ponožky": '<svg viewBox="0 0 24 24"><path d="M9 3h7v10l3.5 3.2a3 3 0 0 1-3.9 4.5L9 15z"/><path d="M9 7h7"/></svg>',
    "Klíčenky": '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="4"/><path d="M12 10.5l8 8M17 15.5l2.5-2.5M15 17.5l2-2"/></svg>',
    "Záložky": '<svg viewBox="0 0 24 24"><path d="M7 3h10v18l-5-4-5 4z"/><path d="M10 8h4"/></svg>'
  };

  /* ilustrace produktů (placeholdery do doby, než budou fotky) */
  function productArt(kind) {
    const t = "#1aa3a6", n = "#1f2a33", c = "#efe6d6";
    switch (kind) {
      case "mikina": return `<svg viewBox="0 0 200 200"><path d="M70 40c0-14 12-24 30-24s30 10 30 24l38 16v110H32V56z" fill="${c}" stroke="${n}" stroke-width="3" stroke-linejoin="round"/><path d="M70 40c4 14 14 22 30 22s26-8 30-22" fill="none" stroke="${n}" stroke-width="3"/><path d="M78 120h44v40H78z" fill="none" stroke="${n}" stroke-width="2.5"/><path d="M118 86c-3-8-10-12-16-9-3-7-10-8-13-3 2 6 8 10 14 12 6 3 12 3 15 0z" fill="none" stroke="${n}" stroke-width="2"/><text x="100" y="176" text-anchor="middle" font-family="Inter,sans-serif" font-size="9" font-weight="700" fill="${n}">SensiHome <tspan fill="${t}">PAW</tspan></text></svg>`;
      case "tricko": return `<svg viewBox="0 0 200 200"><path d="M72 34h56l8 14 32 14-12 22-16-6v88H60V78l-16 6-12-22 32-14z" fill="${n}"/><path d="M72 34c2 12 12 20 28 20s26-8 28-20" fill="none" stroke="#fff" stroke-width="2.5"/><path d="M100 84c-10 0-16 8-18 20 2 12 4 22 6 30h24c2-8 4-18 6-30-2-12-8-20-18-20z" fill="none" stroke="#fff" stroke-width="2"/><path d="M84 92c-6-6-8-14-6-20M116 92c6-6 8-14 6-20" fill="none" stroke="#fff" stroke-width="2"/><text x="100" y="160" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" font-weight="700" fill="#fff">SensiHome <tspan fill="${t}">PAW</tspan></text></svg>`;
      case "ponozky": return `<svg viewBox="0 0 200 200"><path d="M78 30h48v78l30 26a22 22 0 0 1-30 32L78 124z" fill="${c}" stroke="${n}" stroke-width="3" stroke-linejoin="round"/><path d="M78 30h48v16H78z" fill="#fff" stroke="${n}" stroke-width="3"/><path d="M96 124l30 24a22 22 0 0 1 0 18" fill="none" stroke="${n}" stroke-width="3"/><path d="M126 108l30 26a22 22 0 0 1-8 30" fill="${n}"/><g fill="#5c8fd6"><path d="M96 66c-4-6-12-6-12 2 0 6 8 8 12 4 4 4 12 2 12-4 0-8-8-8-12-2z"/><path d="M110 92c-4-6-12-6-12 2 0 6 8 8 12 4 4 4 12 2 12-4 0-8-8-8-12-2z"/><path d="M92 112c-4-6-12-6-12 2 0 6 8 8 12 4 4 4 12 2 12-4 0-8-8-8-12-2z"/></g></svg>`;
      case "klicenka": return `<svg viewBox="0 0 200 200"><path d="M74 30h52v90H74z" rx="8" fill="${c}" stroke="${n}" stroke-width="3"/><g fill="#5c8fd6"><path d="M100 52c-4-6-12-6-12 2 0 6 8 8 12 4 4 4 12 2 12-4 0-8-8-8-12-2z"/><path d="M100 84c-4-6-12-6-12 2 0 6 8 8 12 4 4 4 12 2 12-4 0-8-8-8-12-2z"/></g><circle cx="100" cy="128" r="9" fill="none" stroke="${n}" stroke-width="3"/><path d="M100 137v10" stroke="${n}" stroke-width="3"/><path d="M100 148c-14 0-24 10-24 22 0 10 10 14 24 14s24-4 24-14c0-12-10-22-24-22z" fill="#c9ccd1" stroke="${n}" stroke-width="2.5"/><g fill="${t}"><circle cx="90" cy="160" r="3"/><circle cx="110" cy="160" r="3"/><circle cx="94" cy="152" r="2.6"/><circle cx="106" cy="152" r="2.6"/><ellipse cx="100" cy="170" rx="6" ry="5"/></g></svg>`;
      default: return `<svg viewBox="0 0 200 200"><path d="M64 24h72v156l-36-28-36 28z" fill="${c}" stroke="${n}" stroke-width="3" stroke-linejoin="round"/><path d="M80 44h40M80 56h40M80 68h28" stroke="${n}" stroke-width="2.5"/><g fill="${t}"><path d="M100 118c-8 0-14-5-14-11 0-4 3-6 6-9 2-3 4-6 8-6s6 3 8 6c3 3 6 5 6 9 0 6-6 11-14 11z"/><ellipse cx="84" cy="90" rx="4" ry="6"/><ellipse cx="116" cy="90" rx="4" ry="6"/><ellipse cx="92" cy="80" rx="4" ry="6"/><ellipse cx="108" cy="80" rx="4" ry="6"/></g></svg>`;
    }
  }

  function productImg(p, alt) {
    if (p.foto) return `<img src="${p.foto}" alt="${alt || p.nazev}" loading="lazy">`;
    return `<div class="nophoto">${productArt(p.obrazek)}<span>Foto připravujeme</span></div>`;
  }

  function logoSvg() {
    return '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 24L24 10l16 14v16H8z" fill="none" stroke="#1aa3a6" stroke-width="3" stroke-linejoin="round"/><path d="M4 26L24 8l20 18" fill="none" stroke="#1aa3a6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><g fill="#1aa3a6"><path d="M24 36c-3.2 0-5.6-2-5.6-4.6 0-1.7 1.2-2.7 2.3-3.8.9-1 1.6-2.3 3.3-2.3s2.4 1.3 3.3 2.3c1.1 1.1 2.3 2.1 2.3 3.8 0 2.6-2.4 4.6-5.6 4.6z"/><ellipse cx="17.5" cy="25" rx="1.6" ry="2.3"/><ellipse cx="30.5" cy="25" rx="1.6" ry="2.3"/><ellipse cx="20.8" cy="21" rx="1.6" ry="2.3"/><ellipse cx="27.2" cy="21" rx="1.6" ry="2.3"/></g></svg>';
  }

  /* ---------- hlavička / patička ---------- */
  function page() { return (location.pathname.split("/").pop() || "index.html"); }

  function headerHtml() {
    const p = page();
    const act = (f) => (p === f ? ' class="active"' : "");
    return `
    <div class="demobar">Ukázková verze. Fotky, texty a ceny jsou zástupné, platba je jen simulovaná.</div>
    <div class="topbar"><div class="wrap">
      <div class="claim">${I.heartO.replace("<svg", '<svg style="width:16px;height:16px;fill:none;stroke:#fff;stroke-width:2"')} Bezpečný domov pro smyslově hendikepované psy</div>
      <nav>
        <span class="pages"><a href="o-nas.html">O projektu</a> &nbsp;|&nbsp; <a href="faq.html">FAQ</a> &nbsp;|&nbsp; <a href="kontakt.html">Kontakt</a></span>
        <span class="social"><a href="#" aria-label="Facebook">${I.fb}</a><a href="#" aria-label="Instagram">${I.ig}</a><a href="#" aria-label="TikTok">${I.tt}</a></span>
      </nav>
    </div></div>
    <header class="header"><div class="wrap">
      <a class="logo" href="index.html">${logoSvg()} SensiHome&nbsp;<span>PAW</span></a>
      <nav class="mainnav" id="mainnav">
        <a href="index.html#produkty"${act("index.html")}>Merch</a>
        <a href="o-nas.html"${act("o-nas.html")}>O nás</a>
        <a href="pribeh-malvinky.html"${act("pribeh-malvinky.html")}>Příběh Malvínky</a>
        <a href="podporte-nas.html"${act("podporte-nas.html")}>Podpořte nás</a>
      </nav>
      <div class="tools">
        <a href="index.html#produkty" aria-label="Hledat">${I.search}</a>
        <a href="kosik.html" aria-label="Košík" id="cartlink">${I.cart}<span class="badge zero" id="cartbadge">0</span></a>
        <button class="burger" id="burger" aria-label="Menu">${I.menu}</button>
      </div>
    </div></header>`;
  }

  function footerHtml() {
    const y = new Date().getFullYear();
    return `
    <footer class="footer"><div class="wrap">
      <div class="cols">
        <a class="logo" href="index.html">${logoSvg()} SensiHome&nbsp;<span>PAW</span></a>
        <div>
          <h4>Zůstaňte s&nbsp;námi v&nbsp;kontaktu</h4>
          <form onsubmit="event.preventDefault(); window.SHP.toast('Demo: newsletter zatím není napojený.');">
            <input type="email" placeholder="Váš e-mail" required>
            <button class="btn" type="submit">Odebírat novinky</button>
          </form>
        </div>
        <div>
          <h4>Sledujte nás</h4>
          <div class="social"><a href="#" aria-label="Facebook">${I.fb}</a><a href="#" aria-label="Instagram">${I.ig}</a><a href="#" aria-label="TikTok">${I.tt}</a></div>
        </div>
        <div class="motto hand">Společně<br>pro lepší svět ♡</div>
      </div>
      <div class="bottom">
        <span>© ${y} SensiHome PAW. Všechna práva vyhrazena.</span>
        <span><a href="#">Obchodní podmínky</a> &nbsp;|&nbsp; <a href="#">Ochrana osobních údajů</a> &nbsp;|&nbsp; <a href="kontakt.html">Kontakt</a></span>
      </div>
    </div></footer>
    <div class="toast" id="toast"></div>
    <div class="modal" id="modal"><div class="box" id="modalbox"></div></div>`;
  }

  /* ---------- data ---------- */
  function parseCsv(text) {
    const rows = []; let row = [], cell = "", q = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i], nx = text[i + 1];
      if (q) {
        if (ch === '"' && nx === '"') { cell += '"'; i++; }
        else if (ch === '"') q = false;
        else cell += ch;
      } else if (ch === '"') q = true;
      else if (ch === ",") { row.push(cell); cell = ""; }
      else if (ch === "\n" || ch === "\r") { if (ch === "\r" && nx === "\n") i++; row.push(cell); rows.push(row); row = []; cell = ""; }
      else cell += ch;
    }
    if (cell.length || row.length) { row.push(cell); rows.push(row); }
    const head = rows.shift().map(h => h.trim().toLowerCase());
    return rows.filter(r => r.some(c => c.trim())).map(r => {
      const o = {}; head.forEach((h, i) => o[h] = (r[i] || "").trim()); return o;
    });
  }
  function fromSheet(rows) {
    const list = (s) => s ? s.split(/[;|]/).map(x => x.trim()).filter(Boolean) : [];
    const yes = (s) => /^(ano|yes|true|1)$/i.test(s || "");
    return rows.map(r => ({
      id: r.id || r.nazev.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      nazev: r.nazev, kategorie: r.kategorie, cena: Number(String(r.cena).replace(/[^\d.,]/g, "").replace(",", ".")) || 0,
      velikosti: list(r.velikosti), barvy: list(r.barvy), skladem: yes(r.skladem), novinka: yes(r.novinka),
      obrazek: r.obrazek || "zalozka", foto: r.foto || "", popis: r.popis || ""
    }));
  }
  let _products = null;
  async function loadProducts() {
    if (_products) return _products;
    try {
      if (CFG.SHEET_CSV_URL) {
        const t = await fetch(CFG.SHEET_CSV_URL, { cache: "no-store" }).then(r => r.text());
        _products = fromSheet(parseCsv(t));
      } else {
        _products = await fetch("data/products.json").then(r => r.json());
      }
    } catch (e) {
      console.error("Produkty se nepodařilo načíst", e);
      _products = [];
    }
    return _products;
  }

  /* ---------- košík ---------- */
  const money = (n) => new Intl.NumberFormat("cs-CZ", { style: "currency", currency: "CZK", maximumFractionDigits: 0 }).format(n);
  function getCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } }
  function setCart(c) { localStorage.setItem(CART_KEY, JSON.stringify(c)); renderBadge(); }
  function cartCount() { return getCart().reduce((s, i) => s + i.qty, 0); }
  function renderBadge() {
    const b = document.getElementById("cartbadge"); if (!b) return;
    const n = cartCount(); b.textContent = n; b.classList.toggle("zero", n === 0);
  }
  function addToCart(p, size, color, qty) {
    const c = getCart(); const key = [p.id, size, color].join("|");
    const ex = c.find(i => i.key === key);
    if (ex) ex.qty += qty; else c.push({ key, id: p.id, nazev: p.nazev, cena: p.cena, size, color, qty, obrazek: p.obrazek, foto: p.foto || "" });
    setCart(c);
    toast(`Přidáno do košíku: ${p.nazev}${size ? ", " + size : ""}${color ? ", " + color : ""}`);
  }
  function getFav() { try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; } catch { return []; } }
  function toggleFav(id) { let f = getFav(); f = f.includes(id) ? f.filter(x => x !== id) : f.concat(id); localStorage.setItem(FAV_KEY, JSON.stringify(f)); return f.includes(id); }

  /* ---------- UI ---------- */
  function toast(msg) {
    const t = document.getElementById("toast"); if (!t) return;
    t.textContent = msg; t.classList.add("show");
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 2600);
  }
  function modal(html) {
    const m = document.getElementById("modal"), b = document.getElementById("modalbox");
    b.innerHTML = html; m.classList.add("open");
    m.onclick = (e) => { if (e.target === m) m.classList.remove("open"); };
  }
  function closeModal() { document.getElementById("modal").classList.remove("open"); }

  function cardHtml(p) {
    const fav = getFav().includes(p.id);
    const vars = [p.velikosti.length ? `${p.velikosti.length} velikostí` : "", p.barvy.length > 1 ? `${p.barvy.length} barvy` : ""].filter(Boolean).join(", ");
    return `<article class="card" data-id="${p.id}">
      ${p.novinka ? '<span class="tag">Novinka</span>' : ""}${!p.skladem ? '<span class="tag out">Vyprodáno</span>' : ""}
      <button class="fav${fav ? " on" : ""}" data-fav="${p.id}" aria-label="Oblíbené">${I.heart}</button>
      <a class="img" href="produkt.html?id=${p.id}">${productImg(p)}</a>
      <div class="body">
        <a class="name" href="produkt.html?id=${p.id}">${p.nazev}</a>
        <div class="price">${money(p.cena)}</div>
        <div class="foot"><span class="vars">${vars}</span>
          <a class="btn small" href="produkt.html?id=${p.id}">${p.skladem ? "Do košíku" : "Detail"}</a></div>
      </div></article>`;
  }

  async function renderHome() {
    const grid = document.getElementById("grid"); if (!grid) return;
    const products = await loadProducts();
    const cats = [...new Set(products.map(p => p.kategorie))];
    const catsEl = document.getElementById("cats");
    if (catsEl) {
      catsEl.innerHTML = cats.map(c => `<li data-cat="${c}"><a href="#produkty">${CAT_ICONS[c] || I.pawO}<span>${c}</span></a></li>`).join("");
      catsEl.querySelectorAll("li").forEach(li => li.addEventListener("click", (e) => {
        const on = li.classList.contains("active");
        catsEl.querySelectorAll("li").forEach(x => x.classList.remove("active"));
        if (!on) li.classList.add("active");
        draw(on ? null : li.dataset.cat);
      }));
    }
    function draw(cat) {
      const list = cat ? products.filter(p => p.kategorie === cat) : products;
      grid.innerHTML = list.map(cardHtml).join("") || '<p class="empty">Žádné produkty.</p>';
      grid.querySelectorAll("[data-fav]").forEach(b => b.addEventListener("click", (e) => {
        e.preventDefault(); b.classList.toggle("on", toggleFav(b.dataset.fav));
      }));
    }
    draw(null);
  }

  async function renderProduct() {
    const root = document.getElementById("product"); if (!root) return;
    const id = new URLSearchParams(location.search).get("id");
    const products = await loadProducts();
    const p = products.find(x => x.id === id) || products[0];
    if (!p) { root.innerHTML = '<p class="empty">Produkt nenalezen.</p>'; return; }
    document.title = `${p.nazev} | SensiHome PAW`;
    let size = p.velikosti[0] || "", color = p.barvy[0] || "", qty = 1;
    root.innerHTML = `
      <div class="crumbs"><a href="index.html">Merch</a> / <a href="index.html#produkty">${p.kategorie}</a> / ${p.nazev}</div>
      <div class="layout">
        <div class="gallery"><div class="main">${productImg(p)}</div>
          <div class="thumbs"><div></div><div></div><div></div></div>
          <p class="muted" style="font-size:.85rem;margin-top:.6rem">Fotky z&nbsp;mockupu, v&nbsp;ostré verzi finální produktové fotky.</p></div>
        <div>
          <h1 style="font-size:2rem">${p.nazev}</h1>
          <div class="price">${money(p.cena)}</div>
          <p class="${p.skladem ? "stock" : "stock out"}">${p.skladem ? "Skladem, odesíláme do 3 pracovních dnů" : "Momentálně vyprodáno"}</p>
          <p>${p.popis}</p>
          ${p.velikosti.length ? `<div class="opt"><label>Velikost</label><div class="chips" id="sizes">${p.velikosti.map((s, i) => `<button class="chip${i === 0 ? " on" : ""}" data-v="${s}">${s}</button>`).join("")}</div></div>` : ""}
          ${p.barvy.length ? `<div class="opt"><label>Barva</label><div class="chips" id="colors">${p.barvy.map((s, i) => `<button class="chip${i === 0 ? " on" : ""}" data-v="${s}">${s}</button>`).join("")}</div></div>` : ""}
          <div class="opt"><label>Množství</label><div class="qty"><button id="minus">−</button><input id="qty" value="1" inputmode="numeric"><button id="plus">+</button></div></div>
          <div class="cta"><button class="btn" id="add" ${p.skladem ? "" : "disabled"}>${I.cart.replace("<svg", '<svg style="width:20px;height:20px;stroke:#fff;fill:none;stroke-width:2"')} Do košíku</button>
            <a class="btn ghost" href="index.html#produkty">Zpět na merch</a></div>
          <div class="meta">Část výtěžku z&nbsp;každého kusu jde na projekt bezpečného domova pro psy se smyslovým hendikepem. Doprava přes Zásilkovnu nebo Balík do ruky, osobní odběr zdarma.</div>
        </div>
      </div>`;
    const pick = (wrap, cb) => { const el = document.getElementById(wrap); if (!el) return; el.addEventListener("click", (e) => { const b = e.target.closest(".chip"); if (!b) return; el.querySelectorAll(".chip").forEach(x => x.classList.remove("on")); b.classList.add("on"); cb(b.dataset.v); }); };
    pick("sizes", v => size = v); pick("colors", v => color = v);
    const q = document.getElementById("qty");
    document.getElementById("minus").onclick = () => { qty = Math.max(1, qty - 1); q.value = qty; };
    document.getElementById("plus").onclick = () => { qty = Math.min(20, qty + 1); q.value = qty; };
    q.onchange = () => { qty = Math.min(20, Math.max(1, parseInt(q.value) || 1)); q.value = qty; };
    document.getElementById("add").onclick = () => addToCart(p, size, color, qty);
  }

  function renderCart() {
    const root = document.getElementById("cart"); if (!root) return;
    let ship = localStorage.getItem("shp_ship") || SHIPPING[0].id;
    function draw() {
      const c = getCart();
      if (!c.length) { root.innerHTML = `<div class="empty"><p>Košík je prázdný.</p><a class="btn" href="index.html#produkty">Vybrat merch</a></div>`; return; }
      const sub = c.reduce((s, i) => s + i.cena * i.qty, 0);
      const sh = SHIPPING.find(s => s.id === ship) || SHIPPING[0];
      root.innerHTML = `
        <div class="layout">
          <div>
            <table><thead><tr><th>Produkt</th><th>Množství</th><th style="text-align:right">Cena</th></tr></thead><tbody>
            ${c.map(i => `<tr>
              <td><div class="item"><div class="thumb">${productImg(i, i.nazev)}</div><div><strong>${i.nazev}</strong><br><span class="muted" style="font-size:.85rem">${[i.size, i.color].filter(Boolean).join(", ")}</span><br><button class="remove" data-rm="${i.key}">Odebrat</button></div></div></td>
              <td><div class="qty"><button data-dec="${i.key}">−</button><input value="${i.qty}" readonly><button data-inc="${i.key}">+</button></div></td>
              <td style="text-align:right;font-weight:700">${money(i.cena * i.qty)}</td></tr>`).join("")}
            </tbody></table>
          </div>
          <aside class="summary">
            <h3>Souhrn</h3>
            <div class="ship">${SHIPPING.map(s => `<label><input type="radio" name="ship" value="${s.id}" ${s.id === ship ? "checked" : ""}> ${s.label} <span class="p">${s.price ? money(s.price) : "zdarma"}</span></label>`).join("")}</div>
            <div class="row"><span>Zboží</span><span>${money(sub)}</span></div>
            <div class="row"><span>Doprava</span><span>${sh.price ? money(sh.price) : "zdarma"}</span></div>
            <div class="row total"><span>Celkem</span><span>${money(sub + sh.price)}</span></div>
            <form class="checkout-form" id="checkout">
              <input placeholder="Jméno" required><input placeholder="Příjmení" required>
              <input class="full" type="email" placeholder="E-mail" required>
              <input class="full" placeholder="Telefon" required>
              <input class="full" placeholder="Ulice a číslo popisné" required>
              <input placeholder="Město" required><input placeholder="PSČ" required>
              <label class="check"><input type="checkbox" required> Souhlasím s&nbsp;obchodními podmínkami a&nbsp;zpracováním osobních údajů.</label>
              <button class="btn block full" type="submit">Zaplatit kartou ${money(sub + sh.price)}</button>
            </form>
            <p class="muted" style="font-size:.8rem;margin:.8rem 0 0">Demo: platba se nespustí. V&nbsp;ostré verzi následuje přesměrování na platební bránu (Comgate / Stripe).</p>
          </aside>
        </div>`;
      root.querySelectorAll("[data-rm]").forEach(b => b.onclick = () => { setCart(getCart().filter(i => i.key !== b.dataset.rm)); draw(); });
      root.querySelectorAll("[data-inc]").forEach(b => b.onclick = () => { const c2 = getCart(); const it = c2.find(i => i.key === b.dataset.inc); it.qty = Math.min(20, it.qty + 1); setCart(c2); draw(); });
      root.querySelectorAll("[data-dec]").forEach(b => b.onclick = () => { let c2 = getCart(); const it = c2.find(i => i.key === b.dataset.dec); it.qty -= 1; if (it.qty <= 0) c2 = c2.filter(i => i !== it); setCart(c2); draw(); });
      root.querySelectorAll("input[name=ship]").forEach(r => r.onchange = () => { ship = r.value; localStorage.setItem("shp_ship", ship); draw(); });
      document.getElementById("checkout").onsubmit = (e) => {
        e.preventDefault();
        const num = "SHP" + String(Date.now()).slice(-6);
        modal(`<div class="hand">Děkujeme! ♡</div><h3>Objednávka ${num} (demo)</h3><p>V&nbsp;ostré verzi by teď proběhla platba kartou a&nbsp;přišel potvrzovací e-mail. Tady jen vyprázdníme košík.</p><button class="btn" onclick="window.SHP.closeModal()">Zavřít</button>`);
        setCart([]); draw();
      };
    }
    draw();
  }

  /* ---------- init ---------- */
  function init() {
    const h = document.getElementById("site-header"), f = document.getElementById("site-footer");
    if (h) h.innerHTML = headerHtml();
    if (f) f.innerHTML = footerHtml();
    renderBadge();
    const burger = document.getElementById("burger");
    if (burger) burger.onclick = () => document.getElementById("mainnav").classList.toggle("open");
    document.querySelectorAll("[data-benefits]").forEach(el => {
      el.innerHTML = `
        <div class="item">${I.pawO.replace("<svg", '<svg style="fill:#1aa3a6;stroke:none"')}Pomáháme psům<br>se smyslovým hendikepem</div>
        <div class="item">${I.heartO}Kvalitní a&nbsp;udržitelný<br>produkt</div>
        <div class="item">${I.truck}Rychlé doručení</div>
        <div class="item">${I.leaf}S&nbsp;láskou k&nbsp;přírodě</div>`;
    });
    document.querySelectorAll("[data-paws]").forEach(el => el.innerHTML = I.paw + I.paw);
    renderHome(); renderProduct(); renderCart();
  }
  window.SHP = { toast, closeModal, loadProducts, getCart };
  document.addEventListener("DOMContentLoaded", init);
})();
