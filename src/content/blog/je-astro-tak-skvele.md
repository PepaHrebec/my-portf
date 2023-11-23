---
title: "Je Astro tak skvělé?"
description: "Proč je (méně JS > více JS) a proč na DX opravdu záleží."
date: 2023-21-11
image: "/assets/astro-homepage.png"
---

Betteridgův zákon nadpisů tvrdí, že pokud otázka jakéhokoliv článku končí otazníkem, dá se prakticky bezestrachu přeskočit tím, že se na ní odpoví "Ne". S radostí Vás tedy zvu k tomu, abyste se podíleli na menším nezákonném jednání a na konci článku odpověděli "Ano", stejně jako jsem to udělal já, když jsem v Astru dal dohromady moji první stránku.

## Co je Astro?

Rozhodně by ale neškodilo začít tím, že Vám [Astro.js](https://astro.build/) trochu představím. Astro je JavaScriptový framework zaměřený primárně na SSG, tedy generování statických stránek (podporuje i SSR, ale o tom jindy). Zkrátka vezme vašich 20 Markdown souborů, obleče je do layoutu a přetvoří je do 20 stránek s titulky, slugy a podobně. Dalo by se tím pádem označit za přímého konkurenta Gatsbyho a 11ty a jakéhosi nepřímého rivala Nextu a podobných metaframeworků. V to případě je ale na místě otázka, proč vůbec sahat po Astru, když už pravděpodobně pracujete primárně v Reactu nebo Vue a SSG Váš metaframework nějakým způsobem zvládá. Odpověď na ní se jmenuje Astro Islands.

## Astro Islands?

Astro Islands a "ostrovní architektura", která z nich vzešla a dnes se dá najít například ve frameworku Solid.js (více k architektuře později) umožňuje tvořit malé ostrůvky reaktivity uprostřed moře statického HTML. Ta nejlepší část? Astro není nijak vázané na konkrétní framework. Chcete mít na stránce počítadlo napsané v Reactu? Alpine? Svelte? A co třeba [všechny najednou](https://docs.astro.build/en/guides/integrations-guide/) vedle sebe? Astro umožňuje vkládání komponent cizích frameworků do jeho vlastních .astro souborů (prakticky JSX), čímž dovoluje využívat frameworky čistě pro to, v čem excelují, a nenutí Vás uzamknout se do jedné architektury jenom kvůli několika reaktivním prvkům. A také jde do jednotlivých komponent importovat knihovny, pokud Vás to zajímá (ať žije [Formkit](https://formkit.com/)!).

```astro
<!-- index.astro -->
<div class="tech-heading-wrap">
      <h2 class="tech-heading">Technologie</h2>
      <p class="hovering">Klikni na nás!</p>
    </div>
    <div class="tech-wrap">
      <!-- Já jsem .vue komponenta! -->
      <Technologies tech={techArr} client:visible />
    </div>
```

## JS neumí plavat

Výše jsem psal, že "ostrůvky" jsou taková záchrana reaktivity v moři HTML a asi by se hodilo to uvést na pravou míru. Nejsou jen záchranou reaktivity, ale záchranou JavaScriptu obecně. Astro funguje na principu "Ideální JS znamená žádný JS" a snaží se za každou cenu omezovat množství skriptů, co se dostávají ke klientovi, protože servery jsou levné a mobily pomalé.  
Všechny `.map` funkce na generování komponent, konstruování datumů nebo fetche se odehrávají pouze jednou a to když v konzoli napíšete příkaz "build". Samozřejmě to nedává úplně vždy smysl, obzvlášť u UI frameworků, proto se podívejte na úryvek nahoře. Vue komponenta Technologies má atribut [client:visible](https://docs.astro.build/en/reference/directives-reference/#client-directives), čímž Astru říká, že chceme, aby se komponenta hydratovala (pošle se skript s event listenery atd.) na straně klienta. Když jí vynecháme, server jí vyrenderuje do statického HTML, takže tlačítka sice budou vidět, ale nebudou reagovat.

```astro
<!-- Proběhnu jen na serveru -->
        projectArr.map((proj) => {
          return (
            <ProjectCard
              title={proj.title}
              desc={proj.desc}
              techs={proj.techs}
              link={proj.link}
              ghLink={proj.ghLink}
            />
          );
        })
```

## A co to DX?

Jak si asi dokážete představit, Islands vede k tomu, že udělat stránku, co má podle Lighthousu skóre pod 80, vyžaduje trochu snahy. Výkon ale není to jediné, co Astro nabízí. Psát kód v Astru je zkrátka neuvěřitelně pohodlné.

- Používáte rádi JSX? Tak to si s .astro syntaxí ihned budete rozumět.
- Máte rádi SFC architekturu z Vue? Astro doporučuje psát styly a client-side skripty přímo v souboru, co obsahuje "template" stránky.
- Bojíte se, že by se náhodou názvy stylů překrývaly? Astro je automaticky scopuje pomocí data- atributů, které vytváří při buildění.
- Jste zvyklí na PostCSS a jeho výdobytky? Každé CSS co v Astru napíšete se prožene preprocesorem, který si můžete dle libosti konfigutovat.
- Hodně často zmiňuji JS, ale to proto, že TS se tu automaticky překládá a jde i jako TS importovat. Minimalizaci snad není ani třeba zmiňovat.

Poslední věc, co stojí za řeč jsou obrázky. Podobně jako Next má i Astro vlastní Image komponentu, která automaticky nastavuje aspect-ratio, transformuje obrázky do .webp formátu a stará se i o lazy-loading, takže dny megových obrázků jsou pryč. Vše samozřejmě funguje i pro remote obrázky, například z CMS.

## Mám tedy Astro vyzkoušet?

Ano! Ano, ano, ano! Projekt si nakonfigurujete ani ne za minutu pomocí upřímně krásného CLI a rovnou se můžete vrhnout na kód. Chcete si vyzkoušet nový framework? V Astru si můžete udělat pár komponent a nezávazně si je vyzkoušet, nebo dokonce porovnat jednu vedle druhé. Chytlo váš HTMX a rádi byste si ho vyzkoušeli v příjemném prostředí? Astro podporuje [partialy](https://astro.build/blog/astro-340/). Už jste týden nerýpli do Vašeho blogu? Předělejte ho v Astru. Za zkoušku nic nedáte a slibuji Vám, že Astra rozhodně litovat nebudete.
