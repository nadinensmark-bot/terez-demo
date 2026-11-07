/* Nastavení demo webu SensiHome PAW.
   SHEET_CSV_URL: až bude Google tabulka Produkty publikovaná jako CSV
   (Soubor → Sdílet → Publikovat na web → list Produkty → CSV), vlož sem odkaz.
   Sloupce tabulky: id, nazev, kategorie, cena, velikosti (S;M;L), barvy (Béžová;Černá),
   skladem (ano/ne), novinka (ano/ne), obrazek (mikina/tricko/ponozky/klicenka/zalozka), popis.
   Dokud je prázdné, načítají se produkty z data/products.json. */
window.SHP_CONFIG = {
  SHEET_CSV_URL: "",
  shipping: [
    { id: "zasilkovna", label: "Zásilkovna, výdejní místo", price: 79 },
    { id: "posta", label: "Balík do ruky", price: 129 },
    { id: "osobne", label: "Osobní odběr", price: 0 }
  ]
};
