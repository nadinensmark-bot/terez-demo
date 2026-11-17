# SensiHome PAW: náhled e-shopu

Statický náhled webu pro odsouhlasení vzhledu a obsahu s klientkou (Tereza, SensiHome PAW).
Ostrý e-shop poběží na WordPressu + WooCommerce; tento HTML/CSS se stane základem šablony.

Náhled: https://nadinensmark-bot.github.io/terez-demo/

## Z čeho vychází
- Design: export z Claude Design (barvy, písmo Nunito + Caveat, rádiusy, tlačítka, rozvržení úvodu).
- Texty: dokument „Nástřel textu“ od Terezy (Drive, 13. 11. 2026), převzaté beze změn.
- Logo: originál z Drive (`Grafika/logo_značka/PNG`), nepřekreslované.
- Fotky: `Grafika/Foto Malví s Terinou`, zmenšené pro web.
- Produkty: tabulka „Seznam produktů“; ceny, sklad a fotky zatím chybí.

## Struktura
```
index.html          úvod
eshop.html          katalog s filtrem kategorií
produkt.html?id=…   detail produktu (velikost, barva, množství)
kosik.html          košík, doprava, platba, formulář (nic se neodesílá)
o-projektu.html, nas-pribeh.html, podporte-nas.html, faq.html, kontakt.html
assets/js/data.js   produkty a kategorie
assets/js/app.js    hlavička, patička, katalog, košík
assets/css/style.css
```
