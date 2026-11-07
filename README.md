# SensiHome PAW: demo e-shopu

Ukázkový statický web podle mockupu. Slouží k odsouhlasení designu a chování
s klientkou (Tereza, SensiHome PAW). Platba je jen simulovaná, fotky jsou zástupné.

Živá ukázka: https://nadinensmark-bot.github.io/terez-demo/

## Co demo umí
- úvod podle mockupu (hero, lišta kategorií, karty produktů, výhody, patička)
- detail produktu s výběrem velikosti a barvy, množstvím a „Do košíku"
- košík v prohlížeči (localStorage), výběr dopravy, souhrn, demo pokladna
- obsahové stránky: O nás, Příběh Malvínky, Podpořte nás, FAQ, Kontakt
- produkty z `data/products.json`, nebo z Google tabulky (viz `config.js`)

## Co demo neumí (záměrně)
- skutečnou platbu kartou, sklad, e-maily, faktury, admin
- to je WooCommerce (varianta 1) nebo Stripe Payment Links (varianta 2 lite)

## Struktura
```
index.html            úvod + výpis produktů
produkt.html?id=...   detail produktu
kosik.html            košík a demo pokladna
o-nas.html, pribeh-malvinky.html, podporte-nas.html, faq.html, kontakt.html
config.js             SHEET_CSV_URL a ceny dopravy
data/products.json    produkty (dokud není tabulka)
assets/css/style.css  styly
assets/js/app.js      hlavička/patička, produkty, košík
```

## Produkty z Google tabulky
1. Tabulka se sloupci: `id, nazev, kategorie, cena, velikosti, barvy, skladem, novinka, obrazek, popis`
   (velikosti a barvy odděleny středníkem, skladem/novinka = ano/ne).
2. Soubor → Sdílet → Publikovat na web → vybrat list → CSV → zkopírovat odkaz.
3. Odkaz vložit do `config.js` jako `SHEET_CSV_URL`. Změny se projeví do cca 5 minut.

## Co je potřeba od klienta
- logo ve vektoru (SVG), fotky Malvínky a produktů
- texty označené [DOPLNIT] na stránkách
- rozhodnutí: platba kartou hned (WooCommerce / Stripe), nebo nejdřív převodem
