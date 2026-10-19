# Rezidence Metelka – koncept

## Tři koncepty
1. **Prospekt developera** – web se čte jako tištěná brožura projektu: obálka s tenkým zlatým rámem a wordmarkem, kapitoly Hradec, Dům, Byt, Vzorový byt, Ceník, tenké zlaté linky jako v ražbě.
2. **Řez domem** – technický řez z projektové dokumentace jako zlatá perokresba; vrstvy domu (základy → podlaha → strop → střecha) s popisky skutečných materiálů.
3. **Půdorys k prohlídce** – zařízený půdorys vzorového bytu od VDEKOR jako hlavní nástroj; klik na místnost ukáže plochu, materiál a vizualizaci.

## Výběr
**1 jako rámec, 3 a 2 jako dva signature momenty.** Klientka chce „jednoduchý posh web ve zlaté, béžové a tenkém černém písmu“ – to je přesně jazyk luxusních developerských brožur (piny 192, 199, 191, 202). Fotky exteriéru nemáme, ale máme dva silné vlastní podklady: zařízený půdorys od VDEKOR a řez domem. Ty nesou web místo stocku.

## Skladba
1. Obálka (hero): tenký zlatý rám, wordmark REZIDENCE METELKA, h1 „Byty 2+kk v Hradci Králové“, 3 fakta řádkem (2 domy · 32 bytů · od 4 990 000 Kč), velká vizualizace obývacího pokoje (ilustrační).
2. Hradec Králové: editorial text (blízko centra, sport, dálnice – NE zeleň), fotky HK (katedrála z dronu, Pražský most), jízdní řád vzdáleností s tenkými zlatými linkami ve třech skupinách (Město / Sport / Dálnice).
3. Dům: K Metelce I a II, přízemí se zahrádkou vs. patro s balkonem; **řez domem** jako zlatá SVG kresba s popisky materiálů (signature 2).
4. Byt 2+kk: **interaktivní půdorys** VDEKOR s místnostmi a plochami (signature 1).
5. Vzorový byt: materiálová paleta (rybí kost, Egger Kašmír, Gravel Cream, černá matná), 3–4 vizualizace.
6. Ceník: 32 bytů, filtr Dům I/II a Přízemí/Patro, tabulka s tabulárními čísly.
7. Kontakt: Mgr. Anna Krčmová, formulář (demo), adresa K Metelce.

## Písma, paleta, fotky
- **Bodoni Moda 400** (display, tenké vlasové tahy = „posh“) + **Jost 300/400** (text a prostrkané verzálky jako na brožurách). Obě prošla testem háčků 10. 10. 2026, test znovu na webu (qa.py). Předchozí web v registru měl Lora → bez opakování.
- Paleta (zadání klientky + materiály vzorového bytu): papír #F5F0E8, béž #EAE1D3, písek #D9CBB4, zlatá #B08D57 (linky, plochy), tmavá zlatá #7E6136 (malý text, kontrast ≥ 4,5:1), inkoust #1F1C19, greige Kašmír #CFC6BA.
- Fotky: vlastní půdorys klientky, HK z Wikimedia Commons (CC BY-SA, uvedeni autoři), interiér jako AI vizualizace podle VDEKOR materiálů, vždy s popiskem „ilustrační vizualizace“. Jednotná teplá gradace.

## Zakázané vzory
- Žádný. Čísla kapitol ne. Statistiky jen jako řádek doložených faktů v hero (z ceníku), ne tmavý pás s countery.
- Tenký zlatý rám v hero je koncept brožury, ne pilulková navigace.

## Porovnání
- Schválené: Parolek (výkres s kótami z dokladů → náš řez domem), Hobby Model (popisky kolem objektu), Vila Anna v3 (teplá paleta, display 400, velké mezery, CTA vlevo).
- Odmítnuté: tmavá + zlatá „luxus“ (Zábranský v1, Auren) → web je **světlý**, zlatá jen linky a akcent. Žádné rendery z moodboardu klientky (Bite Marks) – moodboard VDEKOR jen jako zdroj materiálů, vizualizace vlastní. Žádné intro.
- Posledních 5 v registru: sotornik-zivotice (Lora, prohlídka krok za krokem) – jiná skladba i písmo.
